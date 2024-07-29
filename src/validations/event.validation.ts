import { EVENT_FORMAT_VALID_MEMBERS, LEAGUE_SPECIFIC_EVENT_FORMATS } from "@Constants/constants";
import {
  ATTENDEE_STATUS,
  ATTENDEE_TYPE,
  DATE_COMPARE_BY,
  DATE_DIFFERENCE,
  EVENT_FORMAT,
  EVENT_REPITITION,
  EVENT_STATUS,
  EVENT_TYPE,
  EVENT_VISIBILITY,
  PLAYER_SPORTS,
} from "@Constants/enum.constants";
import { DateService } from "@Utils/DateHelpers";
import {
  allowEmptyStringValidation,
  linkValidation,
  objectIdValidation,
} from "@Validations/helpers";
import { baseFilterValidation, paginationValidation } from "@Validations/pagination.validation";
import { z } from "zod";

export const eventLocationValidation = z.object({
  coordinates: z.array(z.number()).optional(),
  formattedAddress: z.string(),
  street: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  zipcode: z.string().optional(),
  country: z.string().optional(),
});

export const eventParticipantsValidation = z.object({
  players: z
    .array(z.object({ player: objectIdValidation, team: objectIdValidation }))
    .min(0)
    .refine(
      (members) => {
        const playerIds = members.map((member) => member.player);
        const ids = new Set(playerIds);
        return ids.size === members.length;
      },
      {
        message: "Each player must have a unique profile ID",
      },
    )
    .optional(),
  teams: z
    .array(objectIdValidation)
    .max(2)
    .refine(
      (members) => {
        const ids = new Set(members);
        return ids.size === members.length;
      },
      {
        message: "Each team must have a unique Team ID",
      },
    )
    .optional(),
});

export const eventAttendeesValidation = z.object({
  players: z
    .array(objectIdValidation)
    .min(0)
    .refine(
      (members) => {
        const ids = new Set(members);
        return ids.size === members.length;
      },
      {
        message: "Each player must have a unique profile ID",
      },
    ),
  teams: z
    .array(objectIdValidation)
    .min(0)
    .refine(
      (members) => {
        const ids = new Set(members);
        return ids.size === members.length;
      },
      {
        message: "Each team must have a unique Team ID",
      },
    ),
  leagues: z
    .array(objectIdValidation)
    .min(0)
    .refine(
      (members) => {
        const ids = new Set(members);
        return ids.size === members.length;
      },
      {
        message: "Each league must have a unique League ID",
      },
    ),
});

export const createEventValidation = {
  body: eventParticipantsValidation
    .extend({
      coverImage: allowEmptyStringValidation.optional(),
      visibility: z.nativeEnum(EVENT_VISIBILITY),
      type: z.nativeEnum(EVENT_TYPE),
      format: z.nativeEnum(EVENT_FORMAT),
      name: z.string().trim(),
      description: allowEmptyStringValidation.optional(),
      startDate: z.coerce.date().min(new Date(), "startDate cannot be in the past"),
      endDate: z.coerce.date().min(new Date(), "endDate cannot be in the past"),
      repitition: z.nativeEnum(EVENT_REPITITION),
      repititionEndDate: z.coerce
        .date()
        .min(new Date(), "repititionEndDate cannot be in the past")
        .optional(),
      link: linkValidation.optional(),
      location: eventLocationValidation.optional(),
      sport: z.nativeEnum(PLAYER_SPORTS),
      teamId: objectIdValidation.optional(),
      leagueId: objectIdValidation.optional(),
      attendees: eventAttendeesValidation,
    })
    .superRefine((data, ctx) => {
      if (LEAGUE_SPECIFIC_EVENT_FORMATS.includes(data.format)) {
        if (!data.leagueId) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: `leagueId is required for that event format`,
            path: ["leagueId"],
          });
        }

        if ((data?.players || []).length === 0 && (data?.teams || []).length === 0) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: `Atleast one player or team is required`,
            path: ["players"],
          });
        }
      } else {
        if ((data?.teams || []).length > 0 || (data?.players || []).length > 0) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: `${data.format} format must have no participants`,
            path: ["players", "teams"],
          });
        }
      }

      const startDate = DateService.getDateTime(data.startDate);
      const endDate = DateService.getDateTime(data.endDate);
      if (DateService.compareDates(DATE_COMPARE_BY.GT, startDate, endDate)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: `endDate cannot be earlier than startDate`,
          path: ["endDate"],
        });
      }
      if (data.repitition !== EVENT_REPITITION.NONE) {
        if (!data.repititionEndDate) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: `repititionEndDate required!`,
            path: ["repititionEndDate"],
          });
        }

        const dateDifference = DateService.getDateDifference(
          endDate,
          startDate,
          DATE_DIFFERENCE.DAYS,
        );

        if (data.repitition === EVENT_REPITITION.WEEKLY && dateDifference > 7) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: `For weekly repetition, the gap between startDate and endDate should be less than or equal to 7 days`,
            path: ["endDate"],
          });
        }

        if (data.repitition === EVENT_REPITITION.MONTHLY && dateDifference > 30) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: `For monthly repetition, the gap between startDate and endDate should be less than or equal to 30 days`,
            path: ["endDate"],
          });
        }
      }

      if (
        data.attendees.players.length === 0 &&
        data.attendees.teams.length === 0 &&
        data.attendees.leagues.length === 0
      ) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: `Atleast one attendee is required`,
          path: ["attendees"],
        });
      }

      const formatValidation = EVENT_FORMAT_VALID_MEMBERS[data.format];

      if (formatValidation) {
        if (
          formatValidation.TEAMS !== undefined &&
          (data.teams || []).length !== formatValidation?.TEAMS
        ) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: `${data.format} must have exactly ${formatValidation.TEAMS} teams`,
            path: ["teams"],
          });
        }
        if (
          formatValidation.PLAYERS !== undefined &&
          (data.players || []).length !== formatValidation.PLAYERS
        ) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: `${data.format} must have exactly ${formatValidation.PLAYERS} players`,
            path: ["players"],
          });
        }
      }

      if (data.type === EVENT_TYPE.ONLINE) {
        if (!data.link) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: `Link is required for online events`,
            path: ["link"],
          });
        }
      } else {
        if (!data?.location) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: `location is required for online events`,
            path: ["location"],
          });
        }

        const requiredFields = [
          { key: "coordinates", message: "Coordinates are required for in-person events" },
          {
            key: "formattedAddress",
            message: "Formatted address is required for in-person events",
          },
          { key: "city", message: "City is required for in-person events" },
          { key: "country", message: "Country is required for in-person events" },
        ];

        requiredFields.forEach(({ key, message }) => {
          if (!(data.location as { [key: string]: string | number[] })[key]) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message,
              path: ["location", key],
            });
          }
        });
      }
    }),
};

export type CreateEventValidationType = {
  body: z.infer<typeof createEventValidation.body>;
};

export const updateEventValidation = {
  body: eventParticipantsValidation
    .partial()
    .extend({
      coverImage: z.string().trim().optional(),
      visibility: z.nativeEnum(EVENT_VISIBILITY).optional(),
      type: z.nativeEnum(EVENT_TYPE).optional(),
      format: z.nativeEnum(EVENT_FORMAT).optional(),
      name: z.string().trim().optional(),
      startDate: z.coerce.date().min(new Date(), "startDate cannot be in the past").optional(),
      endDate: z.coerce.date().min(new Date(), "endDate cannot be in the past").optional(),
      repitition: z.nativeEnum(EVENT_REPITITION).optional(),
      repititionEndDate: z.coerce.date().min(new Date(), "repititionEndDate cannot be in the past"),
      link: z.string().trim().optional(),
      location: eventLocationValidation.optional(),
      sport: z.nativeEnum(PLAYER_SPORTS).optional(),
      teamId: objectIdValidation.optional(),
      leagueId: objectIdValidation.optional(),
      description: z.string().trim().optional(),
    })
    .superRefine((data, ctx) => {
      if (data.startDate && data.endDate) {
        const startDate = DateService.getDateTime(data.startDate);
        const endDate = DateService.getDateTime(data.endDate);
        if (DateService.compareDates(DATE_COMPARE_BY.GT, startDate, endDate)) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: `endDate cannot be earlier than startDate`,
            path: ["endDate"],
          });
        }
        if (data.repitition !== EVENT_REPITITION.NONE) {
          if (!data.repititionEndDate) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: `repititionEndDate required!`,
              path: ["repititionEndDate"],
            });
          }
          const dateDifference = DateService.getDateDifference(
            endDate,
            startDate,
            DATE_DIFFERENCE.DAYS,
          );
          if (data.repitition === EVENT_REPITITION.WEEKLY && dateDifference > 7) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: `endDate cannot be earlier than startDate`,
              path: ["endDate"],
            });
          }
          if (data.repitition === EVENT_REPITITION.MONTHLY && dateDifference > 30) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: `For monthly repetition, the gap between startDate and endDate should be less than or equal to 30 days`,
              path: ["endDate"],
            });
          }
        }
      }

      const formatValidation = data?.format ? EVENT_FORMAT_VALID_MEMBERS[data.format] : null;

      if (formatValidation) {
        if (
          formatValidation.TEAMS !== undefined &&
          data?.teams !== undefined &&
          data.teams.length !== formatValidation?.TEAMS
        ) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: `${data.format} must have exactly ${formatValidation.TEAMS} teams`,
            path: ["teams"],
          });
        }
        if (
          formatValidation.PLAYERS !== undefined &&
          data?.players !== undefined &&
          data.players.length !== formatValidation.PLAYERS
        ) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: `${data.format} must have exactly ${formatValidation.PLAYERS} players`,
            path: ["players"],
          });
        }
      }

      if (data.type === EVENT_TYPE.ONLINE) {
        if (!data.link) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: `Link is required for online events`,
            path: ["link"],
          });
        }
        if (!data.location || !data.location?.formattedAddress) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: `Formatted address is required for online events`,
            path: ["location", "formattedAddress"],
          });
        }
      } else {
        if (!data.location) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: `location is required for in-person events`,
            path: ["location"],
          });
        }
        const requiredFields = [
          { key: "coordinates", message: "Coordinates are required for in-person events" },
          {
            key: "formattedAddress",
            message: "Formatted address is required for in-person events",
          },
          { key: "street", message: "Street is required for in-person events" },
          { key: "city", message: "City is required for in-person events" },
          { key: "state", message: "State is required for in-person events" },
          { key: "zipcode", message: "Zipcode is required for in-person events" },
          { key: "country", message: "Country is required for in-person events" },
        ];
        requiredFields.forEach(({ key, message }) => {
          if (!(data.location as { [key: string]: string | number[] })[key]) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message,
              path: ["location", key],
            });
          }
        });
      }
      if (data.players && data.players.length === 0 && data.teams && data.teams.length === 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: `At least one participant is required`,
          path: ["players"],
        });
      }
    }),
};

export type UpdateEventValidationType = {
  body: Partial<z.infer<typeof updateEventValidation.body>>;
};

export const listEventsValidation = {
  body: paginationValidation.body.extend({
    profileId: objectIdValidation,
    filter: baseFilterValidation.extend({
      teamId: objectIdValidation,
      leagueId: objectIdValidation,
      createdBy: objectIdValidation,
      status: z.nativeEnum(EVENT_STATUS).optional(),
      format: z.nativeEnum(EVENT_FORMAT).optional(),
      repitition: z.nativeEnum(EVENT_REPITITION).optional(),
    }),
  }),
};

export type listEventsValidationType = {
  body: z.infer<typeof listEventsValidation.body>;
};
export type listEventsValidationBodyType = z.infer<typeof listEventsValidation.body>;

export const teamOrLeagueEventsValidation = {
  body: paginationValidation.body.extend({
    teamId: objectIdValidation,
    leagueId: objectIdValidation,
    createdBy: objectIdValidation,
    page: z.number().default(1),
    limit: z.number().default(10),
  }),
};
export type TeamOrLeagueEventsValidationType = z.infer<typeof teamOrLeagueEventsValidation.body>;
export const getEventValidation = {
  params: z.object({
    eventId: objectIdValidation,
  }),
};

export type GetEventValidationType = {
  params: z.infer<typeof getEventValidation.params>;
};
export const fetchEventsBetweenDatesValidation = {
  body: z.object({
    startDate: z.coerce.date(),
    endDate: z.coerce.date(),
  }),
};

export type FetchEventsBetweenDatesValidationType = {
  body: z.infer<typeof fetchEventsBetweenDatesValidation.body>;
};

export const addOrUpdateExceptionValidation = {
  params: z.object({
    eventId: objectIdValidation,
  }),
  body: z
    .object({
      originalDate: z.coerce.date(),
      startDate: z.coerce.date().min(new Date(), "start date cannot be in the past"),
      endDate: z.coerce.date().min(new Date(), "end date cannot be in the past"),
      name: z.string().trim(),
      description: z.string().trim(),
      excludeDate: z.coerce.date().min(new Date(), "exclude date cannot be in the past").optional(),
      repititionEndDate: z.coerce
        .date()
        .min(new Date(), "repititionEndDate cannot be in the past")
        .optional(),
      recurrenceRules: z.array(
        z.object({
          frequency: z.nativeEnum(EVENT_REPITITION),
          startDate: z.coerce.date().min(new Date(), "start date cannot be in the past"),
        }),
      ),
      attendees: z
        .object({
          players: z
            .array(objectIdValidation)
            .min(0)
            .refine(
              (members) => {
                const ids = new Set(members);
                return ids.size === members.length;
              },
              {
                message: "Each player must have a unique profile ID",
              },
            ),
          teams: z
            .array(objectIdValidation)
            .min(0)
            .refine(
              (members) => {
                const ids = new Set(members);
                return ids.size === members.length;
              },
              {
                message: "Each team must have a unique Team ID",
              },
            ),
          leagues: z
            .array(objectIdValidation)
            .min(0)
            .refine(
              (members) => {
                const ids = new Set(members);
                return ids.size === members.length;
              },
              {
                message: "Each league must have a unique League ID",
              },
            ),
        })
        .superRefine((data, ctx) => {
          if (data.players.length === 0 && data.teams.length === 0 && data.leagues.length === 0) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: `At least one attendee is required`,
              path: ["players"],
            });
          }
        }),
    })
    .superRefine((data, ctx) => {
      if (data.startDate && data.endDate) {
        if (data.startDate > data.endDate) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "End date cannot be before start date",
            path: ["endDate"],
          });
        }
      }
    }),
};

export type AddOrUpdateExceptionValidationType = {
  params: z.infer<typeof addOrUpdateExceptionValidation.params>;
  body: z.infer<typeof addOrUpdateExceptionValidation.body>;
};
export type AddOrUpdateExceptionValidationBodyType = z.infer<
  typeof addOrUpdateExceptionValidation.body
>;

export const attendeeStatusValidation = {
  params: z.object({
    eventId: objectIdValidation,
  }),
  body: z.object({
    status: z.nativeEnum(ATTENDEE_STATUS),
    attendeeType: z.nativeEnum(ATTENDEE_TYPE),
    startDate: z.coerce.date(),
  }),
};

export type AttendeeStatusValidationType = {
  params: z.infer<typeof attendeeStatusValidation.params>;
  body: z.infer<typeof attendeeStatusValidation.body>;
};
export type AttendeeStatusValidationBodyType = z.infer<typeof attendeeStatusValidation.body>;
