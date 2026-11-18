import { getUser } from "../services/user.service.js";
import { getCurrentUser } from "../utils/user.js";
import * as service from "../services/vote.service.js";

// Casting Votes
export const createVote = async (req, res) => {
  const token = req.headers["Authorization"].split(" ")[1];
  const { partyId } = req.body;
  const user = getCurrentUser(req, getUser, "sub");
  const newVote = await service.createVote({ userId: user.id, partyId });
  res.status(201).json(newVote);
};

// Total number of votes
export const getVote = async (req, res) => {
  const { partyId } = req.body;
  const votes = await service.getVote({ partyId }, true);
  res.status(200).send(votes.length);
};

// vote cancelling
export const deleteVote = async (req, res) => {
  const { id } = req.body;
  await service.deleteVote({ id });
  res.status(204);
};
