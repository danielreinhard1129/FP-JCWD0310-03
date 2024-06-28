
import { hashPassword } from '@/lib/bcrypt';
import prisma from '@/prisma';
import { EmployeeStation, EmployeeWorkShift, User } from '@prisma/client';

interface AddEmployeeBody
    extends Pick<User, 'email' | 'fullName' | 'password' | 'role' | 'isVerify'> {
    workShift: EmployeeWorkShift;
    station: EmployeeStation;
    outletId: string;
}

export const addEmployeeService = async (
    body: AddEmployeeBody,
) => {
    try {
        const { email, fullName, password, role, isVerify, workShift, station, outletId } = body;

        const existingUser = await prisma.user.findFirst({
            where: { email },
        });

        if (existingUser) {
            throw new Error('An Account With That Email Already Exists!');
        }

        let IsSuperAdmin = false

        if (role == "SUPER_ADMIN") {
            IsSuperAdmin = true
        }

        const hashedPassword = await hashPassword(password);

        //add generate referral code trial

        const addDataUser = await prisma.user.create({
            data: {
                email,
                fullName,
                password: hashedPassword,
                role,
                isVerify,
            },

        });
        const addDataEmployee = await prisma.employee.create({
            data: {
                userId: Number(addDataUser.id),
                outletId: Number(outletId),
                workShift,
                station,
                isSuperAdmin: IsSuperAdmin,
            },

        });

        return {
            user: addDataUser,
            employee: addDataEmployee,
        }

    } catch (error) {
        throw error;
    }
};