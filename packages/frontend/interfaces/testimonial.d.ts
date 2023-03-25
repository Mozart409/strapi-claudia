interface Testimonial {
  id: number
  text: string
  authorName: string
  authorTitle?: any
  link?: ILink
  logo: IMedia
  picture: IMedia
}

export interface TestimonialsProps {
  data: {
    __component: string
    id: number
    title: string
    description: string
    link: ILink
    logos: any[]
    testimonials: Testimonial[]
  }
}
