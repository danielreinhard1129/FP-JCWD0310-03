import prisma from '@/prisma';
import { Employee, Role } from '@prisma/client';

interface updateEmployeeArgs
  extends Pick<Employee, 'outletId' | 'station' | 'workShift'> {
  fullName?: string;
  email?: string;
  role?: Role;
}

export const updateEmployeeService = async (id: number, body: any) => {
  try {
    const { email, fullName, outletId, role, station, workShift } = body;

    const employee = await prisma.employee.findFirst({
      where: { id },
    });
    if (!employee) {
      throw new Error('employee not found');
    }

    if (email) {
      const existingEmail = await prisma.user.findFirst({
        where: {
          email: { equals: email },
        },
      });
      if (existingEmail) {
        throw new Error('email already in use');
      }
    }

    let OutletId = outletId;
    if (outletId) {
      OutletId = Number(outletId);
    }

    let WorkShift = workShift;
    let Stasion = station;
    let IsSuperAdmin = false;

    if (role == 'SUPER_ADMIN') {
      (OutletId = null),
        (WorkShift = null),
        (Stasion = null),
        (IsSuperAdmin = true);
    }

    if (role == 'OUTLET_ADMIN') {
      Stasion = null;
    }

    if (role == 'DRIVER') {
      (WorkShift = null), (Stasion = null);
    }

    const updateEmployee = await prisma.$transaction(async (tx) => {
      const updateDataEmployee = await tx.employee.update({
        where: { id },
        data: {
          outletId: OutletId,
          workShift: WorkShift,
          station: Stasion,
          isSuperAdmin: IsSuperAdmin,
        },
      });

      const updateDataUser = await tx.user.update({
        where: { id: employee.userId },
        data: {
          email,
          fullName,
          role,
        },
      });

      return {
        user: updateDataUser,
        employee: updateDataEmployee,
      };
    })
    return updateEmployee
    
  } catch (error) {
    throw error;
  }
};
