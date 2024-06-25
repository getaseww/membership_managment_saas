// import { FaBars, FaIcons } from "react-icons/fa6";
import { useState } from "react";
import { IoMdClose } from "react-icons/io";
import { FiChevronDown, FiChevronUp } from 'react-icons/fi'; // Importing icons from react-icons
import { routes } from "../../constants/constants";
import { userStore } from "../../store/userStore";
import { Role } from "../../enums/enums";
import { MenuItemType, MenuType } from "../../@types/types";
import { Link, NavLink } from "react-router-dom";

export default function Sidebar({ isOpen, toggleSidebar }: { isOpen: boolean, toggleSidebar: any }) {
    const [expandedMenus, setExpandedMenus] = useState<any>({});
    const user: any = JSON.parse(userStore((state: any) => state.user))

    const toggleMenu = (index: number) => {
        setExpandedMenus((prev: any) => ({
            ...prev,
            [index]: !prev[index],
        }));
    };

    const menus: MenuType[] = [
        {
            title: 'Inventory',
            access: [Role.ADMIN, Role.OWNER],
            items: [
                { name: 'Equipments', link: routes.INVENTORY_EQUIPMENT, access: [Role.OWNER, Role.ADMIN] }
            ]
        },
        {
            title: "SMS",
            access: [Role.ADMIN, Role.OWNER],
            items: [
                { name: "Package", link: routes.SMS_PACKAGE, access: [Role.ADMIN] },
                { name: "Subscription", link: routes.SMS_SUBSCRIPTION, access: [Role.ADMIN, Role.OWNER] },
                { name: "Content", link: routes.SMS_CONTENT, access: [Role.ADMIN, Role.OWNER] },
            ]
        },
        {
            title: "SMS Report",
            access: [Role.ADMIN, Role.OWNER],
            items: [
                { name: "Content Report", link: routes.SMS_CONTENT_REPORT, access: [Role.OWNER, Role.ADMIN] },
                { name: "Subscription Report", link: routes.SMS_SUBSCRIPTION_REPORT, access: [Role.ADMIN, Role.OWNER] },
            ]
        },
        {
            title: 'Look Up',
            access: [Role.ADMIN],
            items: [
                { name: 'Role', link: routes.ROLE, access: [Role.ADMIN] },
                { name: 'Equipment Category', link: routes.INVENTORY_EQUIPMENT_CATEGORY, access: [Role.ADMIN] }
            ]
        },
    ];

    return (
        <div className={`h-screen fixed inset-y-0 left-0 w-50 bg-white shadow-lg transform ${isOpen ? 'translate-x-0 z-50' : '-translate-x-full z-10'} transition-transform duration-200 lg:static lg:inset-auto lg:translate-x-0 lg:z-auto`}>
            <div className="p-6 flex items-center justify-between lg:hidden">
                <button onClick={toggleSidebar} className="p-2 text-gray-500 rounded-lg hover:bg-gray-200">
                    <IoMdClose className="text-black" />
                </button>
            </div>

            <nav className="mt-6">
                <SidebarItem text="Dashboard" link={routes.DASHBOARD} />
                {user?.role == "Admin" && <SidebarItem text="Users" link={routes.USER} />}
                {user?.role == Role.OWNER && <SidebarItem text="Members" link={routes.MEMBER} />}
                {user?.role == Role.OWNER && <SidebarItem text="Membership Plans" link={routes.MEMEBERSHIP_PLAN} />}
                {(user?.role == Role.ADMIN || user?.role == Role.OWNER) && <SidebarItem text="Subscriptions" link={routes.SUBSCRIPTION} />}
                {(user?.role == Role.ADMIN || user?.role == Role.OWNER) && <SidebarItem text="Payments" link={routes.PAYMENT} />}

                {menus.map((menu, index) => (
                    menu.access.includes(user?.role) && (
                        <Menu
                            key={index}
                            title={menu.title}
                            items={menu.items}
                            isExpanded={!!expandedMenus[index]}
                            toggleMenu={() => toggleMenu(index)}
                        />
                    )
                ))}
            </nav>
        </div>
    );
};

const Menu = ({ title, items, isExpanded, toggleMenu }: { title: string, items: MenuItemType[], isExpanded: boolean, toggleMenu: any }) => {
    const user: any = JSON.parse(userStore((state: any) => state.user))

    return (
        <div className="bg-white overflow-hidden">
            <div
                onClick={toggleMenu}
                className="w-full px-4 py-2 text-left flex items-center justify-between bg-blue-500 text-black focus:outline-none"
            >
                <p>{title}</p>
                <span>
                    {isExpanded ? <FiChevronUp size={20} /> : <FiChevronDown size={20} />}
                </span>
            </div>
            {isExpanded && (
                <div className="px-4 py-1 bg-gray-100">
                    <ul>
                        {items.map((item, index) => (
                            item.access.includes(user?.role) && (
                                <Link key={index} to={item.link}>
                                    <li className="py-2">{item.name}</li>
                                </Link>
                            )
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

const SidebarItem = ({ text, link }: { text: string, link: string }) => {
    return (
        <Link
            to={link}
            className="text-black block py-1.5 px-4 rounded transition duration-200 hover:bg-gray-200"
        >
            {text}
        </Link>
    );
};
