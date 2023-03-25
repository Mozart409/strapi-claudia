import NextImage from "../elements/image"

interface RootObject {
  id: number
  title: string
  description?: any
  icon: IMedia
}

const FeatureColumnsGroup = ({ data }) => {
  const features: RootObject[] = data.features
  return (
    <div className="container flex flex-col gap-12 py-12 align-top lg:flex-row lg:flex-wrap">
      {features.map((feature) => (
        <div className="flex-1 text-lg" key={feature.id}>
          <div className="h-auto w-auto">
            <NextImage media={feature.icon} className="" />
          </div>
          <h3 className="mt-4 mb-4 font-bold">{feature.title}</h3>
          <p>{feature.description}</p>
        </div>
      ))}
    </div>
  )
}
export default FeatureColumnsGroup
