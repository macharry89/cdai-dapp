import { FC, HTMLAttributes } from 'react';

const ActionButton: FC<
  HTMLAttributes<HTMLButtonElement> & { disabled?: boolean }
> = ({ children, ...props }) => {
  return (
    <button className="action-btn" {...props}>
      {children}
    </button>
  );
};

export default ActionButton;
