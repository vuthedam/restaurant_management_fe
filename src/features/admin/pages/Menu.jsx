import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

import TopBar from "../components/menu/TopBar";
import CategoryTabs from "../components/menu/CategoryTabs";
import CategorySection from "../components/menu/CategorySection";

const starters = [
  {
    id: 1,
    name: "Classic Bruschetta",
    category: "Italian appetizers",
    price: 12.5,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDN2-oiBR5b5x9lbqhWkIW667QEXZlUUniV6k1YWleomDFLVl7aHWGmRj-xFmbNkDn2SsHAj1AaocxQrEEuD7TPPhv5xkqrXhZUlWzel5dL7UmP9RtcdXkj8CNNeA73fL6-NICK5gv-ZiU-zP5ii0-NskXF4npJnGkUO1OvYn9961YnDrRZd4O31DId-7fZLyU7m0KbjgtfsXdZGydal22r7hedhCWxu3Uuew-EOi30pgjf9J2WegJq9esC3IIspOx4Pl-JkyckdNA",
    status: "Popular",
    inStock: true,
  },

  {
    id: 2,
    name: "Zesty Quinoa Bowl",
    category: "Healthy & Light",
    price: 14,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuApMjJUVXflBCTYeSbTOLigiG7MO-b682v8I-EqgYJx3iyXEo1dDZuSYISlQ6YuaonoXkx9X2P1JPIz7weCERybKfM3t29BDnR6oYtGJn8cGVn7m4SVw8hpBUN4QVZMAcLqZ6DNLMpOUgKhQMEjN9cKEO0S46LJMlaid6L9mbYbV3LguS6GKOIfFe2X4t2bMTrJTk0_bH3sJlKo4jHNai0WEnvkRLtoGjV8o0z2zYDDcAD7WONrIGrtsZ-cuNR4a4Es2SavGIxAzJU",
    status: "Vegan",
    inStock: true,
  },
];

const mains = [
  {
    id: 3,
    name: "Slow-Braised Short Rib",
    category: "Signature Dish",
    price: 32,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDB2_Z6PHp2-xgwoBp9t37StrLqyrbOwAaqrJm6SuFO90XTUoMlcqvfErnTelH8hQRJWn1jn9TsmPO9SqxLlgcrRING8QQg-EKTWD3wj3iAnMbU5eryzCkvd3lYlWMp5bbuiKTjZ_lbmofInhmvvNPHjWtkJVawYqp4gMSsLNc5xKBcqkCDyObLiyYzNaz-xTkywF6GhYVj0qKm39K_qhgvzCVyMsrEPlgB-a-dNZM6CTmdevyKKfN_CGEHst8kjwE159Lt0ILYnH8",
    status: "High Margin",
    inStock: true,
  },
];

export default function Menu() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      <div className="flex-1 lg:ml-64">
        <Header />

        <TopBar />

        <div className="p-6 space-y-8">
          <CategoryTabs />

          <CategorySection title="Starters" items={starters} />

          <CategorySection title="Main Course" items={mains} />
        </div>
      </div>
    </div>
  );
}
