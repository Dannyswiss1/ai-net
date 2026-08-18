use soroban_sdk::{contracttype, Address, Symbol};

#[contracttype]
#[derive(Clone, Debug, PartialEq)]
pub struct AgentRegistered {
    pub agent_id: Symbol,
    pub agent_type: Symbol,
    pub owner: Address,
    pub timestamp: u64,
}

#[contracttype]
#[derive(Clone, Debug, PartialEq)]
pub struct AgentStatusChanged {
    pub agent_id: Symbol,
    pub old_status: Symbol,
    pub new_status: Symbol,
}

#[contracttype]
#[derive(Clone, Debug, PartialEq)]
pub struct AgentRemoved {
    pub agent_id: Symbol,
}

/// Emitted when an agent successfully registers and locks a bond.
#[contracttype]
#[derive(Clone, Debug, PartialEq)]
pub struct BondLocked {
    /// The agent whose bond was locked.
    pub agent_id: Symbol,
    /// Owner address that provided the bond.
    pub owner: Address,
    /// Amount locked, in stroops.
    pub amount_stroops: i128,
}

/// Emitted when an admin slashes part or all of an agent's bond.
#[contracttype]
#[derive(Clone, Debug, PartialEq)]
pub struct BondSlashed {
    /// The agent whose bond was slashed.
    pub agent_id: Symbol,
    /// Penalty amount deducted, in stroops.
    pub penalty_stroops: i128,
    /// Remaining bond after the slash, in stroops.
    pub remaining_stroops: i128,
}

/// Emitted when a deregistered agent's bond is returned after the cooldown.
#[contracttype]
#[derive(Clone, Debug, PartialEq)]
pub struct BondReturned {
    /// The agent whose bond was returned.
    pub agent_id: Symbol,
    /// Owner address that receives the bond.
    pub owner: Address,
    /// Amount returned, in stroops.
    pub amount_stroops: i128,
}
