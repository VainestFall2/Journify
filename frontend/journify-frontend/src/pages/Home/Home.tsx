import { useEffect, useState } from "react";
import { axiosInstance } from "../../api/axiosInstance";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import NavBar from "../../components/NavBar";
import JournifyCard from "../../components/Card/JournifyCard";
import { ToastContainer, toast } from "react-toastify";
import { MdAdd } from "react-icons/md";
import Modal from "react-modal";
import AddEditTravelMoment from "./AddEditTravelMoment";
import ViewTravelMoment from "./ViewTravelMoment";
import DateFilter from "../../components/DateFilter";
import type { DateRange } from "react-day-picker";
import EmptyCard from "../../components/Card/EmptyCard";
import EmptyImg from "../../assets/calendar-svgrepo-com.svg";

interface MomentsProps {
  createdOn: string;
  id: string;
  imageUrl: string;
  isFavorite: boolean;
  story: string;
  title: string;
  userId: string;
  visitedDate: string;
  visitedLocation: string[];
}

interface UserInfoProps {
  created_at: string;
  email: string;
  fullName: string;
  id: string;
  password: string;
  updated_at: string;
}

interface ModalProps {
  isShow: boolean;
  type: string;
  data: MomentsProps | null;
}

export default function Home() {
  const [userInfo, setUserInfo] = useState<UserInfoProps | null>(null);
  const [allMoments, setAllMoments] = useState<MomentsProps[]>([]);
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [openAddEditModal, setOpenAddEditModal] = useState<ModalProps>({
    isShow: false,
    type: "add",
    data: null,
  });

  const [openViewModal, setOpenViewModal] = useState<ModalProps>({
    isShow: false,
    type: "view",
    data: null,
  });

  const navigate = useNavigate();

  const getUserInfo = async () => {
    try {
      const response = await axiosInstance.get("/get-user");
      if (response.data && response.data.user) {
        setUserInfo(response.data.user);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          localStorage.clear();
          navigate("/login");
        }
      }
    }
  };

  const getAllMoments = async () => {
    try {
      const response = await axiosInstance.get("/get-all-moments");
      if (response.data.memories) {
        setAllMoments(response.data.memories);
      }
    } catch (error) {
      console.log("An unexpected error ocurred. Please try again.", error);
    }
  };

  const updateIsFavorite = async (moment: MomentsProps) => {
    try {
      const response = await axiosInstance.put(
        `/update-is-favorite/${moment.id}`,
        { isFavorite: !moment.isFavorite }
      );
      if (response.data.moment) {
        toast.success("Moment Updated Successfully");
        getAllMoments();
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (
          error.response &&
          error.response.data &&
          error.response.data.message
        ) {
          console.log(error.response.data.message);
        }
      }
    }
  };

  const handleDeleteMoment = async (data: MomentsProps | null) => {
    const momentId = data?.id;

    try {
      const response = await axiosInstance.delete(`/delete-moment/${momentId}`);

      if (response.data) {
        toast.success("Moment Deleted Successfully");
        setOpenViewModal((prevState) => ({ ...prevState, isShow: false }));
        getAllMoments();
      }
    } catch (error) {
      console.log("An unexpected error ocurred. Please try again", error);
    }
  };

  const filterMomentsByDate = async (newSelected: DateRange | undefined) => {
    try {
      const startDate = newSelected?.from
        ? new Date(newSelected?.from).getTime()
        : null;
      const endDate = newSelected?.to
        ? new Date(newSelected?.to).getTime()
        : null;

      if (startDate && endDate) {
        const response = await axiosInstance.get("registered-moment/filter", {
          params: { startDate, endDate },
        });

        if (response.data.moment) {
          setAllMoments(response.data.moment);
        }
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (
          error.response &&
          error.response.data &&
          error.response.data.message
        ) {
          console.log(error.response.data.message);
        }
      }
    }
  };

  const handleDaySelected = (newSelected: DateRange | undefined) => {
    setDateRange(newSelected);
    filterMomentsByDate(newSelected);
  };

  const handleViewStory = (moment: MomentsProps) => {
    setOpenViewModal({ isShow: true, type: "view", data: moment });
  };

  useEffect(() => {
    getUserInfo();
    getAllMoments();
  }, []);

  return (
    <>
      <NavBar userInfo={userInfo} />

      <main className="container mx-auto py-10">
        <div className="flex gap-7">
          <section className="flex-1">
            {allMoments.length > 0 ? (
              <div className="grid gid-cols-2 gap-4">
                {allMoments.map((moment) => (
                  <JournifyCard
                    key={moment.id}
                    imageUrl={moment.imageUrl}
                    title={moment.title}
                    story={moment.story}
                    date={moment.visitedDate}
                    visitedLocation={moment.visitedLocation}
                    isFavorite={moment.isFavorite}
                    onHandleViewStory={() => handleViewStory(moment)}
                    onFavoriteClick={() => updateIsFavorite(moment)}
                  />
                ))}
              </div>
            ) : (
              <EmptyCard
                imgSrc={EmptyImg}
                message="Begin your first Travel Story! Click the 'Add' button to capture your thoughts, ideas, and memories. Let`s get started!"
              />
            )}
          </section>

          <DateFilter
            dateRange={dateRange}
            onHandleDaySelected={handleDaySelected}
          />
        </div>
      </main>

      <Modal
        isOpen={openAddEditModal.isShow}
        onRequestClose={() => {}}
        style={{
          overlay: { backgroundColor: "rgba(0,0,0,0.2)", zIndex: 999 },
        }}
        ariaHideApp={false}
        className="model-box"
      >
        <AddEditTravelMoment
          momentInfo={openViewModal.data}
          type={openAddEditModal.type}
          onClose={() => {
            setOpenAddEditModal({ isShow: false, type: "add", data: null });
          }}
          getAllMoments={getAllMoments}
        />
      </Modal>

      <Modal
        isOpen={openViewModal.isShow}
        onRequestClose={() => {}}
        style={{
          overlay: { backgroundColor: "rgba(0,0,0,0.2)", zIndex: 999 },
        }}
        ariaHideApp={false}
        className="model-box"
      >
        <ViewTravelMoment
          momentInfo={openViewModal.data}
          onClose={() => {
            setOpenViewModal((prevState) => ({ ...prevState, isShow: false }));
          }}
          onEditClick={() => {
            setOpenViewModal((prevState) => ({ ...prevState, isShow: false }));
            setOpenAddEditModal((prevState) => ({
              ...prevState,
              isShow: true,
              type: "edit",
            }));
          }}
          onDeleteClick={() => handleDeleteMoment(openViewModal.data)}
        />
      </Modal>

      <button
        className="w-16 h-16 flex items-center justify-center rounded-full bg-primary hover:bg-fuchsia-400 fixed right-10 bottom-10"
        onClick={() => {
          setOpenAddEditModal({ isShow: true, type: "add", data: null });
        }}
      >
        <MdAdd className="text-[32px] text-white" />
      </button>
      <ToastContainer />
    </>
  );
}
