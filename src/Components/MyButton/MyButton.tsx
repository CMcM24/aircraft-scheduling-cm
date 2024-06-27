import { Button, ButtonProps } from "@mui/material";

interface IMyButton extends ButtonProps {}

const MyButton = (props: IMyButton) => {
  return (
    <Button {...props} className={`rounded-xl p-4 ${props.className}`}></Button>
  );
};

export default MyButton;
