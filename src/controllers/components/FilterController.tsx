import {
  FormControl,
  FormControlLabel,
  RadioGroup,
  Radio,
  FormLabel,
} from "@mui/material";

interface FilterProps {
  radioOptions: string[];
  value: any;
  onChange: () => void;
}
const FilterController = ({ radioOptions, value, onChange }: FilterProps) => {
  console.log("FilterController");
  return (
    <>
      <FormControl>
        <FormLabel>Order</FormLabel>
        <RadioGroup row value={value} onChange={() => onChange()}>
          {radioOptions.map((item) => (
            <FormControlLabel
            //   labelPlacement="top"
              key={item}
              value={item}
              control={<Radio />}
              label={item}
            />
          ))}
        </RadioGroup>
      </FormControl>
    </>
  );
};
export default FilterController;
