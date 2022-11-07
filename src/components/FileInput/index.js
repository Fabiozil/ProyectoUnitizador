import React from "react";
import { Controller, useFormState } from "react-hook-form";
import Button from "@mui/material/Button";

function FileInput({
    name,
    control,
    onChange,
    margin = "normal",
    variant = "outlined",
    fullWidth = true,
    required = false,
    rules,
    label,
    register,
    ...restProps
}) {
    const formState = useFormState();
    return (
        <Controller
            name={name}
            defaultValue={""}
            render={({ field }) => (
                <input
                    type="file"
                    hidden
                    name={name}
                    multiple
                    margin={margin}
                    defaultValue={""}
                    value={field.value}
                    {...field}
                    onChange={(event) => {
                        console.log("Mierda");
                        return field.onChange(event.target.file);
                    }}
                    control={control}
                    required={required}
                    fullWidth={fullWidth}
                    {...restProps}
                />
            )}
            rules={rules}
        />
    );
}

export { FileInput };
