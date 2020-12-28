import React, { ChangeEvent, ReactElement } from 'react';
import TextField from "@material-ui/core/TextField";

interface IProps {
    change: (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void,
    defaultValue: string,
    errorCondition: boolean,
    label: string,
    placeholder: string,
};

const input: React.FunctionComponent<IProps> = ({ 
    change, defaultValue, errorCondition, label, placeholder 
}) : ReactElement => (
    <TextField
        onChange={ change }
        defaultValue={ defaultValue }
        error={ errorCondition }
        fullWidth={ true }
        id="standard-basic"
        label={ label }
        helperText={ placeholder }
    />
);

export default input;