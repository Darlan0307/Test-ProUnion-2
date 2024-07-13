import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Ellipsis } from "lucide-react";
import { Button } from "./ui/button";
import DialogDelete from "./dialog-delete";
import DialogUpdate from "./dialog-update";
import { UserResponse } from "@/@types/type-user";

export type Props = {
  user: UserResponse;
};

const ActionsUsers = ({ user }: Props) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="icon" variant="outline">
          <Ellipsis size={20} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem asChild>
          <DialogUpdate user={user} />
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <DialogDelete id={user.id} />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ActionsUsers;
