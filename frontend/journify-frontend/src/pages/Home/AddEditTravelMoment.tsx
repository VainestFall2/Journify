import { MdAdd, MdClose, MdUpdate } from "react-icons/md";
import { DateSelector } from "../../components/input/DateSelector";
import { useEffect, useState } from "react";
import ImageSelector from "../../components/input/ImageSelector";
import TagInput from "../../components/input/TagInput";
import uploadImage from "../../utils/uploadImage";
import { axiosInstance } from "../../api/axiosInstance";
import { toast } from "react-toastify";
import axios from "axios";

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
interface AddEditTravelMomentsProps {
  type: string;
  momentInfo: MomentsProps | null;
  onClose: () => void;
  getAllMoments: () => void;
}

export default function AddEditTravelMoment({
  type,
  onClose,
  momentInfo,
  getAllMoments,
}: AddEditTravelMomentsProps) {
  const [title, setTitle] = useState<string>(momentInfo?.title || "");
  const [visitedDate, setVisitedDate] = useState<Date>(
    momentInfo?.visitedDate ? new Date(momentInfo?.visitedDate) : new Date()
  );
  const [visitedLocation, setVisitedLocation] = useState<string[]>(
    momentInfo?.visitedLocation || []
  );
  const [memoryImg, setMemoryImg] = useState<File | string | null>(
    momentInfo?.imageUrl || ""
  );
  const [moment, setMoment] = useState<string>(momentInfo?.story || "");
  const [error, setError] = useState<string | null>(null);

  const addNewMoment = async () => {
    try {
      let imageUrl = "";

      if (memoryImg && typeof memoryImg !== "string") {
        const imageUploadResponse = await uploadImage(memoryImg);

        imageUrl = imageUploadResponse.uploadFile || "";
      }

      const response = await axiosInstance.post("add-registered-moment", {
        title,
        imageUrl: imageUrl || "",
        story: moment,
        visitedDate: visitedDate,
        visitedLocation,
      });

      if (response.data) {
        toast.success("Moment added successfully");
        getAllMoments();
        onClose();
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (
          error.response &&
          error.response.data &&
          error.response.data.message
        ) {
          setError(error.response.data.message);
        } else {
          console.log("An unexpected error ocurred. Please try again.", error);
        }
      }
    }
  };

  const updateMoment = async () => {
    const momentId = momentInfo?.id;

    try {
      let newImageUrl = "";

      let updateMomentData = {
        title,
        story: moment,
        imageUrl: memoryImg || "",
        visitedDate,
        visitedLocation,
      };

      if (memoryImg && typeof memoryImg !== "string") {
        const imageUploadResponse = await uploadImage(memoryImg);

        newImageUrl = imageUploadResponse.uploadFile || "";

        updateMomentData = {
          ...updateMomentData,
          imageUrl: newImageUrl,
        };
      }

      const response = await axiosInstance.put(
        `/edit-moments/${momentId}`,
        updateMomentData
      );

      if (response.data.moment) {
        toast.success("Moment updated successfully");
        getAllMoments();
        onClose();
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (
          error.response &&
          error.response.data &&
          error.response.data.message
        ) {
          setError(error.response.data.message);
        } else {
          console.log("An unexpected error ocurred. Please try again.", error);
        }
      }
    }
  };

  const handleUpdateOrAddClick = () => {
    if (!title) {
      setError("Please insert the title");
      return;
    }

    if (!moment) {
      setError("Please insert the moment");
      return;
    }

    setError("");

    if (type === "edit") {
      updateMoment();
    } else {
      addNewMoment();
    }
  };

  const handleAddNewMomentClear = () => {
    if (type === "add") {
      setTitle("");
      setVisitedDate(new Date());
      setVisitedLocation([]);
      setMemoryImg(null);
      setMoment("");
    }
  };

  const handleDeleteMomentImg = async () => {
    const deleteImgResponse = await axiosInstance.delete("/delete-upload", {
      params: {
        imageUrl: memoryImg,
      },
    });

    if (deleteImgResponse.data) {
      const momentId = momentInfo?.id;

      const updateMomentData = {
        title,
        story: moment,
        visitedDate,
        visitedLocation,
        imageUrl: "",
      };

      await axiosInstance.put(`edit-moments/${momentId}`, updateMomentData);
    }
  };

  useEffect(() => {
    handleAddNewMomentClear();
  }, []);

  return (
    <section className="relative">
      <header className="flex items-center justify-between">
        <h2 className="text-xl font-medium text-slate-700">
          {type === "add" ? "Add Moment" : "Update Story"}
        </h2>
        <div>
          <div className="flex items-center gap-3 bg-fuchsia-50/50 p-2 rounded-l-lg">
            {type === "add" ? (
              <button className="btn-small" onClick={handleUpdateOrAddClick}>
                <MdAdd /> ADD MOMENT
              </button>
            ) : (
              <button className="btn-small" onClick={handleUpdateOrAddClick}>
                <MdUpdate /> UPDATE MOMENT
              </button>
            )}

            <button className="" onClick={onClose}>
              <MdClose className="text-sl text-slate-400" />
            </button>
          </div>

          {error && (
            <p className="text-red-500 text-xs pt-2 text-right">{error}</p>
          )}
        </div>
      </header>

      <main>
        <div className="flex-1 flex flex-col gap-2 pt-4">
          <label className="input-label">TITLE</label>
          <input
            type="text"
            className="text-2xl text-slate-950 outline-none"
            placeholder="Write your memory here"
            value={title}
            onChange={({ target }) => {
              setTitle(target.value);
            }}
          />

          <div className="my-3">
            <DateSelector date={visitedDate} setDate={setVisitedDate} />
          </div>

          <ImageSelector
            image={memoryImg}
            setImage={setMemoryImg}
            onHandleDeleteMomentImg={handleDeleteMomentImg}
          />

          <div className="flex flex-col gap-2 mt-4">
            <label className="input-label">MOMENT</label>
            <textarea
              className="text-sm text-slate-950 outline-none bg-slate-50 p-2 rounded"
              placeholder="Your Moment"
              rows={10}
              value={moment}
              onChange={({ target }) => {
                setMoment(target.value);
              }}
            />
          </div>

          <div className="pt-3">
            <label>VISITED LOCATIONS</label>
            <TagInput tags={visitedLocation} setTag={setVisitedLocation} />
          </div>
        </div>
      </main>
    </section>
  );
}
