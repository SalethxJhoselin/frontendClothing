import { AimOutlined, SolutionOutlined, SettingOutlined, FileAddOutlined, TeamOutlined } from '@ant-design/icons';
import { FaBox } from 'react-icons/fa';

const SidebarLinks = () => [
  {
    label: "Usuarios",
    icon: <TeamOutlined />,
    subMenu: [
      {
        label: "Administrar Perfil",
        to: "/personnel/manageEmployees",
      },
      {
        label: "Administrar roles",
        to: "/personnel/professions-registry",
      },
      {
        label: "Administrar permisos",
        to: "/personnel/healthcare-professionals-registry",
      },
      {
        label: "Administrar usuarios",
        to: "/personnel/healthcare-professionals-registry",
      }
    ],
  },
  {
    label: "Productos",
    icon: <FaBox />,
    subMenu: [
      {
        label: "Gestionar Categoria",
        to: "/categoria",
      },
      {
        label: "Gestionar Descuentos",
        to: "/descuento",
      },
      {
        label: "Gestionar Color",
        to: "/color",
      },
      {
        label: "Gestionar Talla",
        to: "/talla",
      },
      {
        label: "Gestionar Marca",
        to: "/marca",
      },
      {
        label: "Gestionar Producto",
        to: "/producto",
      }
    ],
  },
  {
    label: "Inventario",
    icon: <SettingOutlined />,
    subMenu: [
      {
        label: "Gestionar Sucursales",
        to: "/sucursal",
      },
      {
        label: "Notas de ingreso",
        to: "/notaIngreso",
      },
      {
        label: "Notas de egreso",
        to: "/notaEgreso",
      },
      {
        label: "Gestionar Inventario",
        to: "/sinventario",
      }
    ],
  },
  {
    label: "Ventas",
    icon: <AimOutlined />,
    subMenu: [
      {
        label: "Nota de venta",
        to: "/notaVenta",
      },
      {
        label: "Tipo de pago",
        to: "/tipoPago",
      }
    ],
  }
];

export default SidebarLinks;
