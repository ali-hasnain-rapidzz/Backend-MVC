import { FAVOURITE_PLAYERS_LIST, FAVOURITE_TEAMS_LIST } from "@Constants/constants";
import { PLAYER_SPORTS, SPORTS_POSITIONS } from "@Constants/enum.constants";
import { objectIdValidation } from "@Validations/helpers";
import { createProfileValidation } from "@Validations/profile.validation";
import { sponsorsValidation } from "@Validations/team.validation";
import { z } from "zod";

const favouriteTeamsValues = FAVOURITE_TEAMS_LIST.map((obj) => obj.value);
export const userFavouriteTeamsValidation = z.enum([
  favouriteTeamsValues[0],
  ...favouriteTeamsValues.slice(1),
]);

const favouritePlayersValues = FAVOURITE_PLAYERS_LIST.map((obj) => obj.value);
export const userFavouritePlayersValidation = z.enum([
  favouritePlayersValues[0],
  ...favouritePlayersValues.slice(1),
]);

// Validation schema for player sports
const playerSportsSchema = z
  .object({
    sport: z.enum([...(Object.values(PLAYER_SPORTS) as [PLAYER_SPORTS, ...PLAYER_SPORTS[]])]),
    positions: z.array(z.string()),
  })
  .superRefine((data, ctx) => {
    const validPositions = SPORTS_POSITIONS[data.sport];
    const invalidPositions = data.positions.filter((pos) => !validPositions.includes(pos));
    if (invalidPositions.length > 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: `One or more positions are not valid for the selected sport: ${invalidPositions.join(
          ", ",
        )}`,
        path: ["positions"],
      });
    }

    const uniquePositions = new Set(data.positions);
    if (uniquePositions.size !== data.positions.length) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Positions array contains duplicate values.",
        path: ["positions"],
      });
    }
  });

export const createPlayerValidation = {
  body: createProfileValidation.body.extend({
    isPrimary: z.boolean().optional(),
    sponsors: z.array(sponsorsValidation).optional(),
    sports: z.array(playerSportsSchema).optional(),
  }),
};

export type CreatePlayerValidationType = {
  body: z.infer<typeof createPlayerValidation.body>;
};

export const getPlayerValidation = {
  params: z.object({
    id: objectIdValidation,
  }),
};
export type GetPlayerValidationType = {
  params: z.infer<typeof getPlayerValidation.params>;
};
export const deletePlayerValidation = {
  params: z.object({
    id: objectIdValidation,
  }),
};
export type DeletePlayerValidationType = {
  params: z.infer<typeof deletePlayerValidation.params>;
};

export const updatePlayerValidation = {
  params: z.object({
    id: objectIdValidation,
  }),
  body: createProfileValidation.body.partial().extend({
    isPrimary: z.boolean().optional(),
    sports: z.array(playerSportsSchema).optional(),
    favouriteTeams: z.array(userFavouriteTeamsValidation).optional(),
    favouritePlayers: z.array(userFavouritePlayersValidation).optional(),
  }),
};

export type UpdatePlayerValidationType = {
  params: Partial<z.infer<typeof updatePlayerValidation.params>>;
  body: Partial<z.infer<typeof updatePlayerValidation.body>>;
};
