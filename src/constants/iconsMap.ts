import { BsPencil, BsThreeDots } from "react-icons/bs";
import { FaBullseye, FaRegUserCircle, FaSignOutAlt } from "react-icons/fa";
import {
  FaArrowDownLong,
  FaArrowUpLong,
  FaFlag,
  FaListUl,
  FaPlus,
  FaSort,
} from "react-icons/fa6";
import { FiMail } from "react-icons/fi";
import { HiOutlineTrash } from "react-icons/hi";
import { ImSpinner9 } from "react-icons/im";
import {
  IoCheckmarkCircleSharp,
  IoSearchOutline,
  IoCloseOutline,
  IoCheckmarkSharp,
  IoSettings,
} from "react-icons/io5";
import { MdLockOutline, MdOutlineBlock } from "react-icons/md";
import {
  PiArrowBendDownLeftBold,
  PiCalendarDotsFill,
  PiExclamationMarkBold,
  PiWarningFill,
} from "react-icons/pi";
import { RiHomeSmileFill, RiProgress3Line } from "react-icons/ri";
import {
  TbCircleDotted,
  TbLayoutDashboardFilled,
  TbLayoutSidebarLeftCollapseFilled,
  TbLayoutSidebarRightCollapseFilled,
} from "react-icons/tb";
import { VscGraph } from "react-icons/vsc";

export const ICONS_MAP = {
  home: RiHomeSmileFill,
  dashboard: VscGraph,
  circleDotted: TbCircleDotted,
  inProgress: RiProgress3Line,
  complete: IoCheckmarkCircleSharp,
  search: IoSearchOutline,
  sideBarLeftCollapse: TbLayoutSidebarLeftCollapseFilled,
  sideBarRightCollapse: TbLayoutSidebarRightCollapseFilled,
  plus: FaPlus,
  list: FaListUl,
  board: TbLayoutDashboardFilled,
  date: PiCalendarDotsFill,
  flag: FaFlag,
  close: IoCloseOutline,
  error: PiWarningFill,
  dotsRow: BsThreeDots,
  trash: HiOutlineTrash,
  leftArrow: PiArrowBendDownLeftBold,
  checkMark: IoCheckmarkSharp,
  pen: BsPencil,
  mail: FiMail,
  lock: MdLockOutline,
  user: FaRegUserCircle,
  notAllowed: MdOutlineBlock,
  spinner: ImSpinner9,
  sort: FaSort,
  arrowUp: FaArrowUpLong,
  arrowDown: FaArrowDownLong,
  bullEye: FaBullseye,
  signOut: FaSignOutAlt,
  exclamationMark: PiExclamationMarkBold,
  setting: IoSettings,
} as const;
