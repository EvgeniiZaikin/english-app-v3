import React, { ChangeEvent, ReactElement, ReactNode } from 'react';
import FormControl from "@material-ui/core/FormControl";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";

interface IProps {
    change: (event: ChangeEvent<{ name?: string; value: unknown }>, child: ReactNode) => void,
    defaultValue: string,
    rows: Array<string>,
};

const radioButtons: React.FunctionComponent<IProps> = ({ 
    change, defaultValue, rows 
}) : ReactElement => (
    <FormControl component="fieldset">
        <RadioGroup 
            onChange={ change } 
            row aria-label="position" 
            name="position" 
            defaultValue={ defaultValue }
        >
            {
                rows.map((item: string, index: number) => {
                    return (
                        <React.Fragment key={ index }>
                            <FormControlLabel 
                                value={ item }
                                control={ <Radio color="primary" /> }
                                label={ item }
                            />
                        </React.Fragment>
                    )
                })
            }
        
        </RadioGroup>
    </FormControl>
);

export default radioButtons;