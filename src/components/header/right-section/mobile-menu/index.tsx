import { Button } from "@/components/ui/button";
import { Menu, Search } from "lucide-react";
import { Link } from "react-router-dom";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const SHEET_SIDES = ["right"] as const;

// type SheetSide = (typeof SHEET_SIDES)[number];

const MobileMenu = () => {
  return (
    <div className="grid grid-cols-2 gap-4 md:hidden">
      <Link to="/en/search">
        <Search />
      </Link>
      {SHEET_SIDES.map((side) => (
        <Sheet key={side}>
          <SheetTrigger asChild>
            <Menu />
          </SheetTrigger>
          <SheetContent side={side}>
            <SheetHeader>
              <SheetTitle>Edit profile</SheetTitle>
              <SheetDescription>
                Make changes to your profile here. Click save when you're done.
              </SheetDescription>
            </SheetHeader>
            <div className="grid gap-4 py-4">sfsf</div>
            <SheetFooter>
              <SheetClose asChild>
                <Button type="submit">Save changes</Button>
              </SheetClose>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      ))}
    </div>
  );
};

export default MobileMenu;
