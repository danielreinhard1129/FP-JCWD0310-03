"use client"

import FormSelect from "@/app/dashboard/master/components/FormSelect"
import ItemLaundryItem from "@/app/dashboard/master/components/ItemLaundryItem"
import FormInput from "@/components/FormInput"
import FormInputDisable from "@/components/FormInputDisable"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { Label } from "@/components/ui/label"
import { zodResolver } from "@hookform/resolvers/zod"
import { Plus, Trash2 } from "lucide-react"
import { FC, useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"

interface FormCreateOrder {
    pickupNumber: string
}

interface FormCreateOrderProps {
    isLoading: boolean,
    onSubmit: any,
    initialValues: FormCreateOrder,
}

const FormCreateOrder: FC<FormCreateOrderProps> = ({isLoading, initialValues, onSubmit }) => {
    const [formItems, setFormItems] = useState([{ id: 1 }]);

    const baseSchema = {
        pickupNumber: z.string({ required_error: "Pickup Number Is Required" }).min(1, "Pickup Number Is Required"),
        weight: z.string({ required_error: "Weight is Required" }).min(1, "Weight is Required"),
    };

    const dynamicSchema = formItems.reduce((acc, item) => {
        acc[`laundryItemId_${item.id}`] = z.string({ required_error: "Laundry Item Is Required" }).min(1, "Laundry Item Is Required");
        acc[`qty_${item.id}`] = z.string({ required_error: "Quantity Is Required" }).min(1, "Quantity Is Required");
        return acc;
      }, {} as Record<string, z.ZodString>);

    const ValidationSchema = z.object({
        ...baseSchema,
        ...dynamicSchema,
      });

    console.log(initialValues);

    const form = useForm<z.infer<typeof ValidationSchema>>({
        mode: "all",
        resolver: zodResolver(ValidationSchema),
        defaultValues: initialValues        
    })

    const addFormLaundryItem = () => {
        setFormItems([...formItems, { id: formItems.slice(-1)[0].id + 1 }]);
    };

    const deleteFormLaundryItem = (id: number) => {
        if (formItems.length > 1) {
            setFormItems(formItems.filter(item => item.id !== id));
        }
    };

    const handleSubmit = (data: any) => {
        const orderItem = formItems.map(item => ({
          laundryItemId: data[`laundryItemId_${item.id}`],
          qty: data[`qty_${item.id}`],
        }));
        const finalData = {
          pickupNumber: data.pickupNumber,
          weight: data.weight,
          orderItem,
        };
        onSubmit(finalData);
      };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-3">
                <FormInputDisable
                    name="pickupNumber"
                    type="text"
                    label="Pickup Number"
                    placeholder="Pickup Number"
                    form={form}
                />
                <FormInput
                    name="weight"
                    type="number"
                    label="Weight"
                    placeholder="Entry Laundry Weight"
                    form={form}
                />
                <div className="flex flex-col gap-3">
                    <Label className="mt-1">Laundry Item</Label>
                    <div className="flex flex-col bg-mythemes-grey px-4 pt-2 pb-4 rounded-md" >
                        {formItems.map((item, index) => (
                            <div key={index} className="flex gap-4 ">
                                <div className="w-3/4">
                                    <FormSelect
                                        name={`laundryItemId_${item.id}`}
                                        label=""
                                        placeholder="Select a Laundry Item"
                                        form={form}
                                        item={<ItemLaundryItem />}
                                    />
                                </div>
                                <div>
                                    <FormInput
                                        name={`qty_${item.id}`}
                                        type="number"
                                        label=""
                                        placeholder="Entry Qty"
                                        form={form}
                                    />
                                </div>
                                <div className="mt-2 flex items-center justify-center">
                                    <div >
                                        {formItems.length > 1 ? (
                                            <Trash2 onClick={() => deleteFormLaundryItem(item.id)} className="text-mythemes-maingreen cursor-pointer" />
                                        ) : (
                                            <Trash2 className="text-mythemes-secondarygreen cursor-pointer" />
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                        <div onClick={addFormLaundryItem} className="bg-mythemes-secondarygreen rounded-md mt-4 p-1 cursor-pointer">
                            <Plus className="text-mythemes-maingreen mx-auto" />
                        </div>
                    </div>
                </div>
                <Button type="submit" disabled={isLoading}>Submit</Button>
            </form>
        </Form>
    )
}
export default FormCreateOrder