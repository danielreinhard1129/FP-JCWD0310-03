import { hashPassword } from '@/lib/bcrypt';
import prisma from '@/prisma';
import { EmployeeStation, EmployeeWorkShift, User } from '@prisma/client';

interface AddEmployeeBody extends Pick<User, 'email' | 'fullName' | 'password' | 'role' | 'isVerify'> {
    workShift: EmployeeWorkShift;
    station: EmployeeStation;
    outletId: string;
}

export const addEmployeeService = async (body: AddEmployeeBody) => {
    try {
        const { email, fullName, password, role, isVerify, workShift, station, outletId } = body;

        const existingUser = await prisma.user.findFirst({
            where: { email },
        });

        if (existingUser && existingUser.isDelete === false) {
            throw new Error('An account with that email already exists!');
        }

        const hashedPassword = await hashPassword(password);

        let outletIdForUpdate: number | null = Number(outletId);
        let workShiftForUpdate: EmployeeWorkShift | null = workShift;
        let stationForUpdate: EmployeeStation | null = station;
        let isSuperAdminForUpdate = role === 'SUPER_ADMIN';

        if (role === 'SUPER_ADMIN') {
            outletIdForUpdate = null;
            workShiftForUpdate = null;
            stationForUpdate = null;
        } else if (role === 'OUTLET_ADMIN') {
            stationForUpdate = null;
        } else if (role === 'DRIVER') {
            workShiftForUpdate = null;
            stationForUpdate = null;
        }

        if (existingUser?.isDelete === true) {
            const updatedUser = await prisma.user.update({
                where: { id: existingUser.id },
                data: {
                    email,
                    fullName,
                    password: hashedPassword,
                    role,
                    isVerify,
                    isDelete: false,
                }
            });

            const updatedEmployee = await prisma.employee.update({
                where: { userId: existingUser.id },
                data: {
                    outletId: outletIdForUpdate,
                    workShift: workShiftForUpdate,
                    station: stationForUpdate,
                    isSuperAdmin: isSuperAdminForUpdate,
                }
            });

            return {
                user: updatedUser,
                employee: updatedEmployee,
            };
        } else {
            const newUser = await prisma.user.create({
                data: {
                    email,
                    fullName,
                    password: hashedPassword,
                    role,
                    isVerify,
                }
            });

            const newEmployee = await prisma.employee.create({
                data: {
                    userId: newUser.id,
                    outletId: Number(outletId),
                    workShift,
                    station,
                    isSuperAdmin: isSuperAdminForUpdate,
                }
            });

            return {
                user: newUser,
                employee: newEmployee,
            };
        }
    } catch (error) {
        throw error;
    }
};
