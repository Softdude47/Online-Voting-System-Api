import * as service from "../services/party.service.js";

export const registerParty = async (req, res) => {
  const newParty = await service.createParty(req.body);
  return res.status(201).json(newParty);
};

export const getParty = async (req, res) => {
  // const { many } = req.query;
  const initials = req.params?.initials?.toUpperCase() || "";
  const party = initials
    ? await service.getParty({ initials }, false)
    : await service.getParty(null, true);

  return res.status(200).json(party);
};

export const editParty = async (req, res) => {
  const initials = req.params.initials.toUpperCase();
  const party = await service.updateParty({ initials }, req.body);
  res.status(201).json(party);
};

export const deactivateParty = async (req, res) => {
  const { id } = req.params;
  await service.deleteParty({ id });
  res.status(204).send("Deleted");
};
