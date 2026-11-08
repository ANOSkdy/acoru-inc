import { ServiceDetail, serviceMetadata } from "../ServiceDetail";

export const metadata = serviceMetadata("data-foundation");

export const dynamic = "force-dynamic";

export default function Page() {
  return <ServiceDetail slug="data-foundation" />;
}
