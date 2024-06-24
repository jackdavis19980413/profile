import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";

export default function Index({ auth, resume, socials, success }) {

    const deleteSocial = (social) => {
        if (!window.confirm("Are you sure you want to delete the social information?")) {
            return;
        }
        router.delete(route("resume.socialDelete", {social: social.id}));
    };

    if (!resume) {
        return <div>No resume data available</div>;
    }
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex justify-between items-center">
                    <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                        Resume
                    </h2>
                    <div className="mt-4 text-right">
                        <Link
                            href={route("resume.create")}
                            className="bg-emerald-500 py-1 px-3 text-white rounded shadow transition-all hover:bg-emerald-600 mr-2"
                        >
                            Add Social
                        </Link>
                        <Link
                            href={route("resume.basic")}
                            className="bg-emerald-500 py-1 px-3 text-white rounded shadow transition-all hover:bg-emerald-600"
                        >
                            Edit Resume
                        </Link>
                    </div>
                </div>
            }
        >
            <Head title="Resume" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    {success && (
                        <div className="bg-emerald-500 py-2 px-4 text-white rounded mb-4">
                            {success}
                        </div>
                    )}
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg p-8">
                        <div className="flex items-center space-x-6">
                            <div className="flex flex-col items-center">
                                <img src={resume.data.picture} className="rounded-full border-4 border-blue-500 dark:border-gray-600" style={{ width: 180 }} />
                                <p className="mt-4 text-gray-700 dark:text-gray-300 text-sm">{resume.data.email}</p>
                            </div>
                            <div className="flex-1">
                                <h3 className="text-purple-500 text-2xl font-semibold">
                                    {resume.data.firstname} {resume.data.lastname}
                                </h3>
                                <p className="text-gray-700 dark:text-gray-300 mb-2">{resume.data.subtitle}</p>
                                <div className="bg-white dark:bg-gray-700 shadow-lg rounded-lg p-6 w-full">
                                    <div className="text-xl text-gray-100 font-bold">{resume.data.caption}</div>
                                    <div className="mt-7 text-lg text-gray-700 dark:text-gray-300 italic float-right">{resume.data.author}</div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 mt-4">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <h3 className="text-gray-200 text-xl font-semibold">
                                Social Links
                            </h3>

                            <table className="mt-3 w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
                                    <tr>
                                        <th className="px-3 py-3">Image</th>
                                        <th className="px-3 py-3">Image path</th>
                                        <th className="px-3 py-3">Social link</th>
                                        <th className="px-3 py-3">Alt</th>
                                        <th className="px-3 py-3"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {socials.data.map((social) => (
                                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                                            key={social.id}>
                                            <td className="px-3 py-2">
                                                <div className="flex space-x-2">
                                                    <img src={social.src} style={{ width: 30 }} />
                                                    <img src={social.src2} style={{ width: 30 }} />
                                                </div>
                                            </td>
                                            <td className="px-3 py-2 text-white hover:underline">
                                                {social.src}
                                            </td>
                                            <td className="px-3 py-2 text-white hover:underline">
                                                {social.href}
                                            </td>
                                            <td className="px-3 py-2">
                                                {social.alt}
                                            </td>
                                            <td className="px-3 py-2 text-nowrap">
                                                <Link
                                                    href={route("resume.edit", social.id)}
                                                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline mx-1"
                                                >
                                                    Edit
                                                </Link>
                                                <button
                                                    onClick={(e) => deleteSocial(social)}
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
