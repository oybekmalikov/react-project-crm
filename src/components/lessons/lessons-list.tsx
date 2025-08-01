import { Tooltip } from "antd";
import { Calendar, ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { LessonType } from "../../types/section";
import LessonInfo from "./lesson-info-modal";
import LessonModal from "./lesson-modal";
const LessonsList = ({ lessons }: any) => {
	const [open, setOpen] = useState(false);
	const [openInfo, setOpenInfo] = useState(false);
	const [update, setUpdate] = useState<LessonType | null>(null);
	const containerRef = useRef<HTMLDivElement>(null);
	const [scrollPosition, setScrollPosition] = useState(0);
	const [selectedLesson, setSelectedLesson] = useState<LessonType | null>(null);
	const handleScroll = () => {
		if (containerRef.current) {
			setScrollPosition(containerRef.current.scrollLeft);
		}
	};
	const go = (val: number) => {
		if (containerRef.current) {
			containerRef.current.scrollBy({ left: val * 200, behavior: "smooth" });
		}
	};
	const isStartDisabled = () => {
		if (!containerRef.current) return true;
		return scrollPosition <= 5;
	};
	const isEndDisabled = () => {
		if (!containerRef.current) return true;
		return (
			scrollPosition + containerRef.current.clientWidth >=
			containerRef.current.scrollWidth - 3
		);
	};
	const updateItem = (lessonData: LessonType) => {
		setOpen(true);
		setUpdate(lessonData);
	};
	const toggle = () => {
		setOpen((prev) => !prev);
		if (update) {
			setUpdate(null);
		}
	};
	const handleClickInfo = (lesson: LessonType) => {
		setSelectedLesson(lesson);
		setOpenInfo(true);
	};
	const toggleInfo = () => {
		setOpenInfo(!openInfo);
		setSelectedLesson(null);
	};
	const getStatusColor = (status: string) => {
		switch (status.toLowerCase()) {
			case "bekor qilingan":
				return "bg-gradient-to-br from-red-500 to-red-600 text-white border-red-300";
			case "tugagan":
				return "bg-gradient-to-br from-green-500 to-green-600 text-white border-green-300";
			case "yangi":
				return "bg-[#ccc] text-black border-blue-300";
			default:
				return "bg-gradient-to-br  to-gray-200 text-gray-800 border-gray-300 hover:from-gray-200 hover:to-gray-300";
		}
	};
	const formatDayAndMonth = (date: string) => {
		const newDate = date.split("T")[0];
		const [_, month, day] = newDate.split("-");
		return `${day}.${month}`;
	};
	useEffect(() => {
    if (containerRef.current && lessons.length > 0) {
      const inProgressIndex = lessons.findIndex(
        (lesson: LessonType) => lesson.status === "in_progress"
      );

      if (inProgressIndex !== -1) {
        const lessonElements = Array.from(containerRef.current.children[0].children) as HTMLElement[];
        const targetLessonElement = lessonElements[inProgressIndex];
        if (targetLessonElement) {
          targetLessonElement.scrollIntoView({
            behavior: "smooth",
            block: "center",
            inline: "center", 
          });
        }
      } else {
        containerRef.current.scrollTo({ left: 0, behavior: "smooth" });
      }
    }
  }, [lessons]);
	return (
		<div className="w-full bg-white rounded-2xl  border border-gray-100 overflow-hidden mb-5">
			{/* Header */}
			<div className="bg-gradient-to-r text-black px-6 py-4">
				<div className="flex items-center justify-between">
					<div className="flex items-center gap-3">
						<div className="p-2 bg-white/20 rounded-lg">
							<Calendar className="w-5 h-5 text-white" />
						</div>
						<div>
							<h2 className="text-lg font-medium text-gray-900">Lessons</h2>
							<p className="text-sm font-medium text-gray-900">Group lessons</p>
						</div>
					</div>
					<div className="bg-white rounded-lg shadow p-4 flex flex-wrap items-center gap-4 text-gray-900 text-sm font-medium w-fit">
						<span>
							All: <span className="font-bold">{lessons.length}</span>
						</span>
						<span>
							<span className="inline-block px-2 py-0.5 rounded bg-green-100 text-green-700 font-semibold">
								Completed
							</span>
							:
							<span className="ml-1">
								{
									lessons.filter(
										(lesson: LessonType) => lesson.status === "completed"
									).length
								}
							</span>
						</span>
						<span>
							<span className="inline-block px-2 py-0.5 rounded bg-red-100 text-red-700 font-semibold">
								Canceled
							</span>
							:
							<span className="ml-1">
								{
									lessons.filter(
										(lesson: LessonType) => lesson.status === "cancelled"
									).length
								}
							</span>
						</span>
						<span>
							<span className="inline-block px-2 py-0.5 rounded bg-yellow-200 text-black font-semibold">
								In Progress
							</span>
							:
							<span className="ml-1">
								{
									lessons.filter(
										(lesson: LessonType) => lesson.status === "in_progress"
									).length
								}
							</span>
						</span>
						<span>
							<span className="inline-block px-2 py-0.5 rounded bg-gray-200 text-black font-semibold">
								New
							</span>
							:
							<span className="ml-1">
								{
									lessons.filter(
										(lesson: LessonType) => lesson.status === "new"
									).length
								}
							</span>
						</span>
					</div>
				</div>
			</div>

			<div className="relative p-6">
				<div className="flex items-center gap-4">
					<button
						onClick={() => go(-1)}
						disabled={isStartDisabled()}
						className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-r from-gray-100 to-gray-200 hover:from-indigo-100 hover:to-indigo-200 disabled:from-gray-50 disabled:to-gray-100 border border-gray-200 flex items-center justify-center transition-all duration-300 hover:shadow-md disabled:cursor-not-allowed group"
					>
						<ChevronLeft className="w-5 h-5 text-gray-600 group-hover:text-indigo-600 group-disabled:text-gray-400" />
					</button>

					<div
						ref={containerRef}
						onScroll={handleScroll}
						className="flex-1 overflow-x-auto scrollbar-hide"
						style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
					>
						<div className="flex gap-2 p-[10px]">
							{lessons.map((lesson: LessonType, index: number) => {
								const dateInfo = formatDayAndMonth(lesson.date);
								return (
									<div
										key={lesson.id || index}
										onClick={() => handleClickInfo(lesson)}
										onContextMenu={(e) => {
											e.preventDefault();
											updateItem(lesson);
										}}
										className={`${getStatusColor(lesson.status)} 
                      flex-shrink-0 w-14 h-14 p-4 rounded-xl border-2 cursor-pointer 
                      transition-all duration-300 hover:shadow-lg hover:scale-105 
                      transform hover:-translate-y-1 relative overflow-hidden`}
									>
										<Tooltip
											title={lesson?.notes}
											color={
												lesson.status == "cancelled"
													? "#E80A15"
													: lesson.status == "in_progress"
													? "#FFD700"
													: lesson.status == "completed"
													? "#008000"
													: "#ccc"
											}
											// overlayInnerStyle={
											// 	lesson.status == "cancelled"
											// 		? { color: "#fff" }
											// 		: lesson.status == "in_progress"
											// 		? { color: "#fff" }
											// 		: lesson.status == "completed"
											// 		? { color: "#fff" }
											// 		: { color: "#000" }
											// }
										>
											<div className="text-center">
												<div className="text-[14px] font-bold">
													{dateInfo.split(".")[0]}
												</div>
												<div className="text-[10px] font-medium opacity-90">
													{dateInfo.split(".")[1]}
												</div>
											</div>

											<div className="absolute top-1 right-1 size-3">
												<div
													className={`w-3 h-3 rounded-full ${
														lesson.status === "cancelled"
															? "bg-red-500"
															: lesson.status === "new"
															? "bg-gray-400"
															: lesson.status === "completed"
															? "bg-green-500"
															: lesson.status === "in_progress"
															? "bg-yellow-500"
															: "bg-gray-400"
													} opacity-80`}
												></div>
											</div>
										</Tooltip>
									</div>
								);
							})}
						</div>
					</div>
					<button
						onClick={() => go(1)}
						disabled={isEndDisabled()}
						className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-r from-gray-100 to-gray-200 hover:from-indigo-100 hover:to-indigo-200 disabled:from-gray-50 disabled:to-gray-100 border border-gray-200 flex items-center justify-center transition-all duration-300 hover:shadow-md disabled:cursor-not-allowed group"
					>
						<ChevronRight className="w-5 h-5 text-gray-600 group-hover:text-indigo-600 group-disabled:text-gray-400" />
					</button>
				</div>
			</div>

			{open &&( <LessonModal open={open} toggle={toggle} update={update} />)}

			{openInfo && (
				<LessonInfo
					open={openInfo}
					toggle={toggleInfo}
					lesson={selectedLesson}
				/>
			)}
		</div>
	);
};

export default LessonsList;
