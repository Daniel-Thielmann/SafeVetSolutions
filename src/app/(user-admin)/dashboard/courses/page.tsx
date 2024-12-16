'use server'

import getCourses from "@/auth/get-courses/route";
import CoursesCard from "@/components/courses/course-card";
import Pagination from "@/components/pagination/pagination";
import Title from "@/components/title/title";


  async function getAllCourses(currentPage: number) {
    try {
        const courses = await getCourses(currentPage);
        return courses
    } catch (error) {
        console.error('Fail to get courses', error)
    }
}

export default async function Cousers ({searchParams}:{searchParams:{page?:string}}) {

    const currentPage = Number(searchParams.page) || 1
    const courses = await getAllCourses(currentPage);

    console.log(courses)

    return (
        <div className=" flex flex-col">
            <div className="w-full">
                <Title title="Cursos" />
                
                <div className="flex flex-col mt-8 bg-[#C6DDED] rounded-lg p-6 lg:p-8 w-11/12 lg:w-10/12 mx-auto gap-3">
                    <div className="gap-8 grid grid-cols-1 md:grid-cols-2 place-items-center w-full">
                        {courses?.courses.map((item, index) => (
                            <CoursesCard id={item.id} title={item.product.title} description={item.product.description} key={index} />
                        ))}
                    </div>
                    {
                        courses?.courses && courses.totalPages > 1 &&
                        <Pagination totalPages={courses?.totalPages} />
                    }
                </div>
            </div>
        </div>
    )
}