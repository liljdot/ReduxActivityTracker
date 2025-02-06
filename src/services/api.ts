import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Activity } from "../redux/activitySlice";

export const api = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:4000/"
    }),
    endpoints: (builder) => ({
        getActivities: builder.query<Activity[], void>({
            query: () => ({
                url: "activities",
                method: "GET"
            })
        })
    })
})

export const { useGetActivitiesQuery } = api