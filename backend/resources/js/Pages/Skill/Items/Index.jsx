import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";

export default function Index({ auth, skill, items, success }) {

    const deleteItem = (item) => {
        if (!window.confirm("Are you sure you want to delete the item information?")) {
            return;
        }
        router.delete(route("skill.deleteItem", { skill: skill.id, item: item.id }));
    };

    if (!items) {
        return <div>No item data available</div>;
    }
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex justify-between items-center">
                    <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                        My Skills / {skill.index} / Items
                    </h2>
                    <div className="mt-4 text-right">
                        <Link
                            href={route("skill.index")}
                            className="bg-gray-100 py-1 px-3 text-gray-800 rounded shadow transition-all hover:bg-gray-200 mr-2"
                        >
                            Cancel
                        </Link>
                        <Link
                            href={route("skill.createItem", {skill: skill.id})}
                            className="bg-emerald-500 py-1 px-3 text-white rounded shadow transition-all hover:bg-emerald-600 mr-2"
                        >
                            Add Item
                        </Link>
                    </div>
                </div>
            }
        >
            <Head title="Skill" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    {success && (
                        <div className="bg-emerald-500 py-2 px-4 text-white rounded mb-4">
                            {success}
                        </div>
                    )}
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">

                            <table className="mt-3 w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
                                    <tr>
                                        <th className="w-1/12 px-3 py-3">No</th>
                                        <th className="w-3/4 px-3 py-3">Description</th>
                                        <th className="w-1/6 px-3 py-3"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {items.data.map((item, i) => (
                                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                                            key={item.id}>
                                            <td className="px-3 py-2">
                                                { i + 1 }
                                            </td>
                                            <td className="px-3 py-2">
                                                {item.description}
                                            </td>
                                            <td className="px-3 py-2 text-nowrap">
                                                <Link
                                                    href={route("skill.editItem", {skill: skill.id, item: item.id})}
                                                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline mx-1"
                                                >
                                                    Edit
                                                </Link>
                                                <button
                                                    onClick={(e) => deleteItem(item)}
                                                    className="font-medium text-red-600 dark:text-red-500 hover:underline mx-1"
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))}

                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
