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
        }),
        postActivity: builder.mutation<Activity, Activity>({
            query: (credentials) => ({
                url: "activities",
                method: "POST",
                body: credentials
            })
        }),
        deleteActiivity: builder.mutation<Activity, string>({
            query: (id) => ({
                url: `activities/${id}`,
                method: "DELETE"
            })
        }),
        patchActivity: builder.mutation<Activity, Activity>({
            query: (credentials) => ({
                url: `activities/${credentials.id}`,
                method: "PATCH",
                body: credentials
            })
        })
    })
})

export const { useGetActivitiesQuery, usePostActivityMutation, useDeleteActiivityMutation, usePatchActivityMutation } = api