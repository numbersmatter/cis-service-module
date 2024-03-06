import DataCards from "~/components/pages/home/data-cards";

export default function StaffIndex() {

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">{/* Content goes here */}
      <div className="prose py-2 md:py-5">
        <h1>Dashboard</h1>
      </div>
      <DataCards />
    </div>
  )

}