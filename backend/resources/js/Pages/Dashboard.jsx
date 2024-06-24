import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";
import {
    EXPERIENCE_POSITION_CLASS_MAP,
    EXPERIENCE_POSITION_TEXT_MAP,
    EXPERIENCE_CATEGORY_CLASS_MAP,
    EXPERIENCE_CATEGORY_TEXT_MAP,
} from "@/constants.jsx";

export default function Dashboard({ auth, resume, socials, skills, exps, projects, success }) {

    if (!resume) {
        return <div>No resume data available</div>;
    }
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex justify-between items-center">
                    <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                        Dashboard
                    </h2>
                    <div className="mt-4 text-right">
                        {/* <Link
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
                        </Link> */}
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
                                        </tr>
                                    ))}

                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 mt-4">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <h3 className="text-gray-200 text-xl font-semibold">
                                My Skills
                            </h3>
                            <table className="mt-3 w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
                                    <tr>
                                        <th className="px-3 py-3">Image</th>
                                        <th className="px-3 py-3">Image Path</th>
                                        <th className="px-3 py-3">Index</th>
                                        <th className="px-3 py-3">Alt</th>
                                        <th className="px-3 py-3">Title</th>
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
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 mt-4">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <h3 className="text-gray-200 text-xl font-semibold">
                                Experiences & Educations
                            </h3>
                            <div className="overflow-auto">
                                <table className="mt-3 w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
                                        <tr>
                                            <th className="px-3 py-3">ID</th>
                                            <th className="px-3 py-3">Image</th>
                                            <th className="px-3 py-3">Content</th>
                                            <th className="px-3 py-3">Alt</th>
                                            <th className="px-3 py-3">Duration</th>
                                            <th className="px-3 py-3">Position</th>
                                            <th className="px-3 py-3">Category</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {exps.data.map((experience) => (
                                            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                                                key={experience.id}>
                                                <td className="px-3 py-2">
                                                    {experience.id}
                                                </td>
                                                <td className="px-3 py-2">
                                                    <div className="flex space-x-2">
                                                        <img src={experience.src} style={{ width: 60 }} />
                                                    </div>
                                                </td>
                                                <td className="px-3 py-2">
                                                    {experience.title} <br />
                                                    {experience.subtitle}
                                                </td>
                                                <td className="px-3 py-2">
                                                    {experience.alt}
                                                </td>
                                                <td className="px-3 py-2">
                                                    {experience.we_date}
                                                </td>
                                                <td className="px-3 py-2">
                                                    <span
                                                        className={
                                                            "px-3 py-2 w-24 h-12 text-white rounded-full " +
                                                            EXPERIENCE_POSITION_CLASS_MAP[experience.position]
                                                        }
                                                    >
                                                        {EXPERIENCE_POSITION_TEXT_MAP[experience.position]}
                                                    </span>
                                                </td>
                                                <td className="px-3 py-2">
                                                    <span
                                                        className={
                                                            "px-2 py-2 rounded-full text-white " +
                                                            EXPERIENCE_CATEGORY_CLASS_MAP[experience.category]
                                                        }
                                                    >
                                                        {EXPERIENCE_CATEGORY_TEXT_MAP[experience.category]}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 mt-4">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <h3 className="text-gray-200 text-xl font-semibold">
                                Projects
                            </h3>
                            <table className="mt-3 w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
                                    <tr>
                                        <th className="px-3 py-3">Image</th>
                                        <th className="px-3 py-3">Title</th>
                                        <th className="px-3 py-3">Description</th>
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
