import { Metadata } from 'next';
import CareersClient from './careers-client';

export const metadata: Metadata = {
  title: "Careers | Build the Future of Industrial Automation",
  description: "Join an elite team of engineers, architects, and consultants at Prixgen. Current openings for Senior Python/Odoo Developers and Functional Consultants in Mysuru.",
};

export default function CareersPage() {
  return <CareersClient />;
}
