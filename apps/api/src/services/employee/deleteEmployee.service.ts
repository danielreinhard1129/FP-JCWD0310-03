import prisma from '@/prisma';

export const deleteEmployeeService = async (id: number) => {
  try {

    const employee = await prisma.employee.findFirst({
      where: { id },
      include: {user: true}
    });
    if (!employee) {
      throw new Error('Employee not found');
    }
    
    const updateDataUser = await prisma.user.update({
      where: { id: employee.userId },
      data: {isDelete: true},
    });

    return {
      user: updateDataUser,
    };
  } catch (error) {
    throw error;
  }
};
