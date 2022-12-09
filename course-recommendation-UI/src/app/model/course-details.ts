export class CourseDetails{
  constructor(public courseId: number, public courseName: string,
              public description: string, public preRequisites: string, public professorName: string,
              public term: string, public courseType: string,
              public rating: number, public workload: number){}
}
