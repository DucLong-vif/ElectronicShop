import React, { memo, useState } from "react";
import { productInfoTabs } from "../../ultils/contants";
import { Votebar, Button, VoteOptions, Comment } from "..";
import { renderStarFromNumber } from "../../ultils/helpers";
import { apiRatings } from "../../apis";
import { useDispatch, useSelector } from "react-redux";
import { showModal } from "../../store/app/appSlice";
import Swal from "sweetalert2";
import path from "../../ultils/path";
import { useNavigate } from "react-router-dom";
// const activedStyles = '';
// const notActivedStyles = '';

const Productinfortion = ({
  totalRatings,
  ratings,
  nameProduct,
  pid,
  rerender,
}) => {
  const [activedTab, setActivedTab] = useState(1);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoggedIn } = useSelector((state) => state.user);
  const handleSumitVoteOption = async ({ comment, score }) => {
    if (!comment || !score || !pid) {
      alert("Hãy bình chọn khi nhấn gửi");
      return;
    }
    await apiRatings({ comment, star: score, pid, updatedAt : Date.now() });
    dispatch(showModal({ isShowModal: false, modalChildren: null }));
    rerender();
  };
  const handleVoteNow = () => {
    if (!isLoggedIn) {
      Swal.fire({
        text: "Đăng nhập xong mới được vote",
        cancelButtonText: "Cancel",
        confirmButtonText: "Đăng nhập",
        title: "Oops!",
        showCancelButton: true,
      }).then((rs) => {
        if (rs.isConfirmed) navigate(`/${path.LOGIN}`);
      });
    } else {
      dispatch(
        showModal({
          isShowModal: true,
          modalChildren: (
            <VoteOptions
              nameProduct={nameProduct}
              handleSumitVoteOption={handleSumitVoteOption}
            />
          ),
        })
      );
    }
  };
  return (
    <div>
      <div className="flex items-center gap-2 relative bottom-[-1px]">
        {productInfoTabs.map((el) => (
          <span
            className={`p-2  px-4 cursor-pointer ${
              activedTab === el.id
                ? "bg-white border border-b-0"
                : "bg-gray-200"
            }`}
            key={el.id}
            onClick={() => setActivedTab(el.id)}
          >
            {el.name}
          </span>
        ))}
      </div>
      <div className="w-full border p-4">
        {productInfoTabs.some((el) => el.id === activedTab) &&
          productInfoTabs.find((el) => el.id === activedTab)?.content}
      </div>
      <div className="flex py-8 flex-col">
        <span className={`p-2 text-[25px] px-4 cursor-pointe border font-semibold capitalize bg-gray-100`}>
          Đánh giá của khách hàng
        </span>

        <div className="flex border mt-2">
          <div className="flex-4 flex-col flex items-center justify-center">
            <span className="font-semibold text-3xl">{`${totalRatings}/5`}</span>
            <span className="flex items-center gap-1">
              {renderStarFromNumber(totalRatings)?.map((el, index) => (
                <span key={index}>{el}</span>
              ))}
            </span>
            <span className="text-sm">
              <span className="font-semibold mr-1">{`${ratings?.length}`}</span>
              <span>Người đánh giá và nhận xét</span>
            </span>
          </div>
          <div className="flex-6 gap-2 p-4 flex flex-col">
            {Array.from(Array(5).keys())
              .reverse()
              .map((el) => (
                <Votebar
                  key={el}
                  number={el + 1}
                  ratingTotal={ratings?.length}
                  ratingCount={
                    ratings?.filter((i) => i.star === el + 1)?.length
                  }
                />
              ))}
          </div>
        </div>

        <div className="p-4 items-center justify-center text-sm flex flex-col gap-2">
          <span>Bạn đánh giá sản phẩm này</span>
          <Button handlOnclick={handleVoteNow}>Đánh giá ngay</Button>
        </div>
        <div className="flex flex-col gap-4">
          {ratings?.map((el) => (
            <Comment
              key={el._id}
              star={el.star}
              updatedAt={el.updatedAt}
              comment={el.comment}
              name={` ${el.postedBy?.firstName} ${el.postedBy?.lastName}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default memo(Productinfortion);
