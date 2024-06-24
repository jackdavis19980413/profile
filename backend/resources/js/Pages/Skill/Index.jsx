import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";

export default function Index({ auth, skills, success }) {

    const deleteSkill = (skill) => {
        if (!window.confirm("Are you sure you want to delete the skill information?")) {
            return;
        }
        router.delete(route("skill.destroy", { skill: skill.id }));
    };

    if (!skills) {
        return <div>No skill data available</div>;
    }
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex justify-between items-center">
                    <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                        My Skills
                    </h2>
                    <div className="mt-4 text-right">
                        <Link
                            href={route("skill.create")}
                            className="bg-emerald-500 py-1 px-3 text-white rounded shadow transition-all hover:bg-emerald-600 mr-2"
                        >
                            Add Skill
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
                                        <th className="px-3 py-3">Image</th>
                                        <th className="px-3 py-3">Image Path</th>
                                        <th className="px-3 py-3">Index</th>
                                        <th className="px-3 py-3">Alt</th>
                                        <th className="px-3 py-3">Title</th>
                                        <th className="px-3 py-3"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {skills.data.map((skill) => (
                                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                                            key={skill.id}>
                                            <td className="px-3 py-2">
                                                <div className="flex space-x-2">
                                                    <img src={skill.src} style={{ width: 30 }} />
                                                </div>
                                            </td>
                                            <td className="px-3 py-2 text-white hover:underline">
                                                {skill.src}
                                            </td>
                                            <td className="px-3 py-2 text-white hover:underline">
                                                {skill.index}
                                            </td>
                                            <td className="px-3 py-2">
                                                {skill.alt}
                                            </td>
                                            <td className="px-3 py-2">
                                                {skill.title}
                                            </td>
                                            <td className="px-3 py-2 text-nowrap">
                                                <Link
                                                    href={route("skill.edit", skill.id)}
                                                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline mx-1"
                                                >
                                                    Edit
                                                </Link>
                                                <Link
                                                    href={route("skill.items", {skill: skill.id})}
                                                    className="font-medium text-yellow-600 dark:text-yellow-500 hover:underline mx-1"
                                                >
                                                    Items
                                                </Link>
                                                <button
                                                    onClick={(e) => deleteSkill(skill)}
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
