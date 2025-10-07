export interface MenuButtonProps
  extends React.HTMLAttributes<HTMLButtonElement> {
  title: string;
  explanation: string;
  url: string;
  color: string;
}