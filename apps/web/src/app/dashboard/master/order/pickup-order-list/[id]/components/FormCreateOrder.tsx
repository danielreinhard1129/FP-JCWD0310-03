"use client"

import FormSelect from "@/app/dashboard/master/components/FormSelect";
import ItemLaundryItem from "@/app/dashboard/master/components/ItemLaundryItem";
import FormInput from "@/components/FormInput";
import FormInputDisable from "@/components/FormInputDisable";
import { Button } from "@/components/ui/button";
import { FormProvider, useFieldArray, useForm } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, Trash2 } from "lucide-react";
import { FC } from "react";
import { z } from "zod";

interface FormCreateOrderProps {
    isLoading: boolean;
    onSubmit: (data: any) => void;
    initialValues: {
        pickupNumber: string;
        weight: string;
        orderItem: { laundryItemId: string; qty: string }[];
    };
}

const schema = z.object({
    pickupNumber: z.string({ required_error: "Pickup Number is required" }).min(1, "Pickup Number is required"),
    weight: z.string({ required_error: "Weight is required" }).min(1, "Weight is required"),
    orderItem: z.array(
        z.object({
            laundryItemId: z.string({ required_error: "Laundry Item is required" }).min(1, "Laundry Item is required"),
            qty: z.string({ required_error: "Quantity is required" }).min(1, "Quantity is required"),
        })
    ).min(1, "At least one item is required"),
});

const FormCreateOrder: FC<FormCreateOrderProps> = ({ isLoading, initialValues, onSubmit }) => {
    const methods = useForm({
        mode: "all",
        resolver: zodResolver(schema),
        defaultValues: initialValues,
    });

    const { control, handleSubmit } = methods;
    const { fields, append, remove } = useFieldArray({
        control,
        name: "orderItem",
    });

    const handleAddItem = () => append({ laundryItemId: "", qty: "" });
    const handleRemoveItem = (index: number) => {
        if (fields.length > 1) {
            remove(index);
        }
    };

    const onFormSubmit = (data: any) => {
        onSubmit(data);
    };

    return (
        <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-3">
                <FormInputDisable
                    name="pickupNumber"
                    type="text"
                    label="Pickup Number"
                    placeholder="Pickup Number"
                    form={methods}
                />
                <FormInput
                    name="weight"
                    type="number"
                    label="Weight"
                    placeholder="Enter Laundry Weight"
                    min={1}
                    form={methods}
                />
                <div className="flex flex-col gap-3">
                    <Label className="mt-1">Laundry Items</Label>
                    <div className="flex flex-col bg-mythemes-secondaryblue/20 px-4 pt-2 pb-4 rounded-md">
                        {fields.map((field, index) => (
                            <div key={field.id} className="flex gap-4">
                                <div className="w-3/4">
                                    <FormSelect
                                        name={`orderItem.${index}.laundryItemId`}
                                        label=""
                                        placeholder="Select a Laundry Item"
                                        form={methods}
                                        item={<ItemLaundryItem />}
                                    />
                                </div>
                                <div>
                                    <FormInput
                                        name={`orderItem.${index}.qty`}
                                        type="number"
                                        label=""
                                        placeholder="Enter Qty"
                                        min={1}
                                        form={methods}
                                    />
                                </div>
                                <div className="mt-2 flex items-center justify-center">
                                    {fields.length > 1 ? (
                                        <Trash2
                                            onClick={() => handleRemoveItem(index)}
                                            className="text-mythemes-maingreen cursor-pointer"
                                        />
                                    ) : (
                                        <Trash2
                                            className="text-mythemes-maingreen opacity-50 cursor-not-allowed"
                                        />
                                    )}
                                </div>
                            </div>
                        ))}
                        <div onClick={handleAddItem} className="bg-mythemes-secondaryblue/40 rounded-md mt-4 p-1 cursor-pointer">
                            <Plus className="text-mythemes-maingreen mx-auto" />
                        </div>
                    </div>
                </div>
                <Button type="submit" disabled={isLoading} className="bg-mythemes-maingreen">Submit</Button>
            </form>
        </FormProvider>
    );
}

export default FormCreateOrder;
