import { useState } from "react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../components/ui/dialog";
import { Plus, Pencil, Trash2 } from "lucide-react";
import toast from "react-hot-toast";

import useCategories from "../../hooks/category/useCategories";
import useCreateCategories from "../../hooks/category/useCreateCategories";
import useUpdateCategories from "../../hooks/category/useUpdateCategories";
import useDeleteCategory from "../../hooks/category/useDeleteCategories";

function AdminCategories() {
  const [openModal, setOpenModal] = useState(false);
  const [categoryName, setCategoryName] = useState("");
  const [editingCategory, setEditingCategory] = useState(null);

  const { data: categories = [], isLoading } = useCategories();
  const createCategory = useCreateCategories();
  const updateCategory = useUpdateCategories();
  const deleteCategory = useDeleteCategory();

  /* ---------------- CREATE / UPDATE ---------------- */

  const handleSubmit = () => {
    if (!categoryName.trim()) {
      return toast.error("Category name can't be empty");
    }

    // UPDATE
    if (editingCategory) {
      updateCategory.mutate(
        {
          id: editingCategory.id,
          data: { name: categoryName },
        },
        {
          onSuccess: () => {
            setOpenModal(false);
            setCategoryName("");
            setEditingCategory(null);
          },
        },
      );
      return;
    }

    // CREATE
    createCategory.mutate(
      { name: categoryName },
      {
        onSuccess: () => {
          setOpenModal(false);
          setCategoryName("");
        },
      },
    );
  };

  /* ---------------- DELETE ---------------- */

  const handleDelete = (id) => {
    if (
      window.confirm(
        "Are you sure you want to delete this category? This may affect associated products.",
      )
    ) {
      deleteCategory.mutate(id);
    }
  };

  /* ---------------- OPEN MODALS ---------------- */

  const openCreateModal = () => {
    setEditingCategory(null);
    setCategoryName("");
    setOpenModal(true);
  };

  const openEditModal = (category) => {
    setEditingCategory(category);
    setCategoryName(category.name);
    setOpenModal(true);
  };

  if (isLoading) {
    return <p className="p-6">Loading categories...</p>;
  }

  return (
    <div className="w-full flex flex-col gap-6">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-1">
          <h2 className="text-2xl font-bold">Categories</h2>
          <p className="text-sm text-slate-400">Manage product categories</p>
        </div>

        <Button onClick={openCreateModal}>
          <Plus className="h-4 w-4 mr-2" />
          Add Category
        </Button>
      </div>

      {/* TABLE */}
      <div className="overflow-hidden rounded-xl border border-accent bg-card">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-accent bg-muted/40 text-left text-sm font-medium text-muted-foreground">
              <th className="px-6 py-4">Name</th>
              <th className="px-6 py-4">Slug</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>

          <tbody>
            {categories.length === 0 ? (
              <tr>
                <td
                  colSpan={3}
                  className="px-6 py-12 text-center text-muted-foreground"
                >
                  No categories found
                </td>
              </tr>
            ) : (
              categories.map((category) => (
                <tr
                  key={category.id}
                  className="border-b border-accent last:border-none hover:bg-muted/40 transition"
                >
                  <td className="px-6 py-4 font-medium">
                    {category.name || "Unnamed"}
                  </td>

                  <td className="px-6 py-4 text-muted-foreground">
                    {(category.name || "").toLowerCase().replace(/\s+/g, "-") ||
                      "no-name"}
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => openEditModal(category)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>

                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-destructive"
                        onClick={() => handleDelete(category.id)}
                        disabled={deleteCategory.isPending}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* CREATE / EDIT DIALOG */}
      <Dialog open={openModal} onOpenChange={setOpenModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingCategory ? "Edit Category" : "Add Category"}
            </DialogTitle>
            <DialogDescription>
              {editingCategory
                ? "Update the category name."
                : "Create a new category for your ecommerce store."}
            </DialogDescription>
          </DialogHeader>

          <div className="py-4">
            <label className="text-sm font-medium mb-2 block">
              Category Name
            </label>
            <Input
              className="w-full bg-foreground/10"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              placeholder="Enter category name"
              autoFocus
            />
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setOpenModal(false);
                setEditingCategory(null);
              }}
              disabled={createCategory.isPending || updateCategory.isPending}
            >
              Cancel
            </Button>

            <Button
              className="text-white bg-green-500"
              onClick={handleSubmit}
              disabled={createCategory.isPending || updateCategory.isPending}
            >
              {editingCategory
                ? updateCategory.isPending
                  ? "Updating..."
                  : "Update Category"
                : createCategory.isPending
                  ? "Creating..."
                  : "Create Category"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AdminCategories;
