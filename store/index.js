import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunk from "redux-thunk";
import DemoReducer from "../store/redux/DemoReducer/demo.reducer";
import NewsReducer from "../store/redux/NewsEvents/news.reducer";
import TrainerReducer from "../store/redux/Trainer/trainer.reducer";
import ProshopReducer from "../store/redux/ProshopReducer/proshop.reducer";
import BannerReducer from "../store/redux/Banner/banner.reducer";
import CourseReducer from "../store/redux/CourseReducer/course.reducer";
import ContentReducer from "../store/redux/LoadContentReducer/content.reducer";

const composeEnhancers =
  (typeof window !== "undefined" &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;
const reducer = combineReducers({
  DemoReducer,
  NewsReducer,
  TrainerReducer,
  ProshopReducer,
  BannerReducer,
  CourseReducer,
  ContentReducer,
});

export const store = createStore(
  reducer,
  composeEnhancers(applyMiddleware(thunk))
);
