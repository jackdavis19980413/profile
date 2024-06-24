import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";

export default function Index({ auth, projects, success }) {

    const deleteProject = (project) => {
        if (!window.confirm("Are you sure you want to delete the project information?")) {
            return;
        }
        router.delete(route("project.destroy", { project: project.id }));
    };

    if (!projects) {
        return <div>No project data available</div>;
    }
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex justify-between items-center">
                    <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                        Projects
                    </h2>
                    <div className="mt-4 text-right">
                        <Link
                            href={route("project.create")}
                            className="bg-emerald-500 py-1 px-3 text-white rounded shadow transition-all hover:bg-emerald-600 mr-2"
                        >
                            Add Project
                        </Link>
                    </div>
                </div>
            }
        >
            <Head title="Project" />

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
                                        <th className="px-3 py-3">Title</th>
                                        <th className="px-3 py-3">Description</th>
                                        <th className="px-3 py-3"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {projects.data.map((project) => (
                                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                                            key={project.id}>
                                            <td className="px-3 py-2">
                                                <div className="flex space-x-2">
                                                    <img src={project.src} style={{ width: 60 }} />
                                                </div>
                                            </td>
                                            <td className="px-3 py-2">
                                                {project.title}
                                            </td>
                                            <td className="px-3 py-2">
                                                {project.description}
                                            </td>
                                            <td className="px-3 py-2 text-nowrap">
                                                <Link
                                                    href={route("project.edit", project.id)}
                                                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline mx-1"
                                                >
                                                    Edit
                                                </Link>
                                                <button
                                                    onClick={(e) => deleteProject(project)}
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
