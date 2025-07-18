import { EditOutlined } from "@ant-design/icons";
import { GroupColumns, PopConfirm } from "@components";
import { useGeneral, useGroups } from "@hooks";
import type { GroupType } from "@types";
import {
	Button,
	Space,
	Table,
	type TablePaginationConfig,
	type TableProps,
} from "antd";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import GroupModal from "./modal";
const Groups: React.FC = () => {
	const [open, setOpen] = useState(false);
	const [update, setUpdate] = useState<GroupType | null>(null);
	const location = useLocation();
	const { handlePagination } = useGeneral();
	const [params, setParams] = useState({
		page: 1,
		limit: 10,
	});
	const navigate = useNavigate();
	const { data, useGroupDelete } = useGroups(params);
	const { mutate: deleteGroup, isPending: isDeleting } = useGroupDelete();
	useEffect(() => {
		const searchParams = new URLSearchParams(location.search);
		const page = searchParams.get("page") || "1";
		const limit = searchParams.get("limit") || "10";
		if (page && limit) {
			setParams({
				page: Number(page),
				limit: Number(limit),
			});
		}
	}, [location.search]);
	const deleteItem = (id: number) => {
		deleteGroup(id);
	};
	const updateItem = (groupData: GroupType) => {
		setOpen(true);
		setUpdate(groupData);
	};
	const toggle = () => {
		setOpen(!open);
		if (update) {
			setUpdate(null);
		}
	};
	const handleTableChange = (pagination: TablePaginationConfig) => {
		handlePagination({ pagination, setParams });
	};
	const columns: TableProps<GroupType>["columns"] = [
		...(GroupColumns ?? []),
		{
			title: "Action",
			key: "action",
			render: (_, record: GroupType) => (
				<Space size="middle">
					<Button
						type={"primary"}
						size="small"
						onClick={() => updateItem(record)}
					>
						<EditOutlined />
					</Button>
					<PopConfirm
						handleDelete={() => deleteItem(record.id)}
						loading={isDeleting}
					/>
				</Space>
			),
		},
	];
	return (
		<>
			{open && <GroupModal open={open} toggle={toggle} update={update} />}
			<div style={{ display: "flex", justifyContent: "space-between" }}>
				<h1 className="mb-4 text-1xl font-bold tracking-tight text-gray-900 md:text-3xl lg:text-1xl dark:text-dark">
					Groups
				</h1>
				<Button
					className="mb-4"
					type="primary"
					onClick={() => setOpen(true)}
				>
					Add New Group
				</Button>
			</div>
			<Table<GroupType>
				columns={columns}
				dataSource={data?.data.data}
				onRow={(record) => ({
					onClick: () => {
						navigate(`${record.id}`);
					},
					style: { cursor: "pointer" },
				})}
				rowKey={(record) => record.id}
				pagination={{
					current: params.page,
					pageSize: params.limit,
					total: data?.data.total,
					showSizeChanger: true,
					pageSizeOptions: [2, 6, 10, 14, 18, 20],
				}}
				onChange={handleTableChange}
			/>
		</>
	);
};
export default Groups;
