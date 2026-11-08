import { ServiceDetail, serviceMetadata } from "../ServiceDetail";

export const metadata = serviceMetadata("genba-dx-design");

export const dynamic = "force-dynamic";

export default function Page() {
  return <ServiceDetail slug="genba-dx-design" />;
}
