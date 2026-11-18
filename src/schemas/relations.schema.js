import "dotenv/config";
import { defineRelations } from "drizzle-orm";
import { Party } from "./party.schema.js";
import { User } from "./user.schema.js";
import { Vote } from "./vote.schema.js";

export default defineRelations({ Party, User, Vote }, (r) => ({
  User: {
    vote: r.one.Vote({
      from: r.User.id,
      to: r.Vote.voterId,
    }),
  },
  Party: {
    firstCandidate: r.one.User({
      from: r.Party.firstCandidateId,
      to: r.User.id,
    }),
    secondCandidate: r.one.User({
      from: r.Party.secondCandidateId,
      to: r.User.id,
    }),
  },
  Vote: {
    voter: r.one.User({
      from: r.Vote.voterId,
      to: r.User.id,
    }),
    party: r.one.Party({
      from: r.Vote.partyId,
      to: r.Party.id,
    }),
  },
}));
