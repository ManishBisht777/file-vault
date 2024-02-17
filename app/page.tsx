import ImageUpload from "@/components/custom/image-upload";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function Home() {
  return (
    <main className="flex justify-center items-center min-h-screen">
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">Image upload</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-center">Upload your files</DialogTitle>
            <DialogDescription className="text-center">
              The only file upload you will ever need
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <ImageUpload />
          </div>
        </DialogContent>
      </Dialog>
    </main>
  );
}
