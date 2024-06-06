"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useEffect, useState } from "react"
import FormInput from "./FormInput"
import { ValidationSchemaDriver, ValidationSchemaOutletAdmin, ValidationSchemaSuperAdmin, ValidationSchemaWorker } from "../add-employee/validationSchema"
import FormSelect from "./FormSelect"
import ItemRole from "./ItemRole"
import ItemOutlet from "./ItemOutlet"
import FormSelectRole from "./FormSelectRole"
import ItemWorkShift from "./ItemWorkShift"
import ItemStation from "./ItemStation"

export function ProfileForm() {
    const [selected, setSelected] = useState<string>("")
    const [schema, setSchema] = useState(ValidationSchemaSuperAdmin)

    
    const form = useForm<z.infer<typeof ValidationSchemaWorker>>({
        mode: "all",
        resolver: zodResolver(schema),
        defaultValues: {

        },
    })

    function onSubmit(values: z.infer<typeof schema>) {
        console.log(values)
    }

    useEffect(()=>{
        if (selected == "SUPER_ADMIN") {
            setSchema(ValidationSchemaSuperAdmin)
        } else if (selected == "OUTLET_ADMIN"){
            setSchema(ValidationSchemaOutletAdmin)
        } else if (selected == "WORKER"){
            setSchema(ValidationSchemaWorker)
        } else if (selected == "DRIVER"){
            setSchema(ValidationSchemaDriver)
        }
    },[selected])

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
                <FormInput
                    name="fullName"
                    type="text"
                    label="Full Name"
                    placeholder="Your Full Name"
                    form={form}
                />
                <FormInput
                    name="email"
                    type="email"
                    label="Email"
                    placeholder="Your Email"
                    form={form}
                />
                <FormInput
                    name="password"
                    type="password"
                    label="Password"
                    placeholder="Entry Password"
                    form={form}
                />
                <FormSelectRole
                    name="role"
                    label="Role"
                    placeholder="Select a Role"
                    form={form}
                    setSelected={setSelected}
                    item={<ItemRole />}
                />

                {selected == "OUTLET_ADMIN" ? (
                    <>
                        <FormSelect
                            name="outlet"
                            label="Outlet"
                            placeholder="Select an Outlet"
                            form={form}
                            item={<ItemOutlet />}
                        />
                        <FormSelect
                            name="workShift"
                            label="Work Shift"
                            placeholder="Select a Work Shift"
                            form={form}
                            item={<ItemWorkShift />}
                        />
                    </>
                ) : (
                    <div></div>
                )}

                {selected == "WORKER" ? (
                    <>
                        <FormSelect
                            name="outlet"
                            label="Outlet"
                            placeholder="Select an Outlet"
                            form={form}
                            item={<ItemOutlet />}
                        />
                        <FormSelect
                            name="workShift"
                            label="Work Shift"
                            placeholder="Select a Work Shift"
                            form={form}
                            item={<ItemWorkShift />}
                        />
                        <FormSelect
                            name="station"
                            label="Station"
                            placeholder="Select a Station"
                            form={form}
                            item={<ItemStation />}
                        />
                    </>
                ) : (
                    <div></div>
                )}

                {selected == "DRIVER" ? (
                    <>
                        <FormSelect
                            name="outlet"
                            label="Outlet"
                            placeholder="Select an Outlet"
                            form={form}
                            item={<ItemOutlet />}
                        />
                    </>
                ) : (
                    <div></div>
                )}

                <Button type="submit">Submit</Button>
            </form>
        </Form>
    )
}
