import prisma from "@/prisma"

export const getEmployeeService = async (id: number) => {
    try {
        const employee = await prisma.employee.findFirst({
            where: {id},
            include: {user: true, outlet:true},
        })

        if(employee?.user.isDelete==true){
            throw new Error('Employee account is already deleted')
        }

        if(!employee) {
            throw new Error('blog not found')
        }

        return employee;
    } catch (error) {
        throw error
    }
}