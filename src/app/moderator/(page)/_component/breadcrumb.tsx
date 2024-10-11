import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
} from "@/components/ui/breadcrumb";
import Link from "next/link";

interface BreadcrumbsProps {
  links: string[];
}
export default function Breadcrumbs({ links }: BreadcrumbsProps) {
  return (
    <Breadcrumb className="hidden md:flex">
      <BreadcrumbList>
        {links.map((item, index) => (
          <BreadcrumbItem key={index}>
            <BreadcrumbLink asChild>
              <Link href="#">{item}</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
