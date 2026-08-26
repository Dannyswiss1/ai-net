//! # Discovery Oracle Types
//!
//! Type definitions for agent discovery queries, ranked search results,
//! and aggregate oracle statistics.

use soroban_sdk::{contracttype, Symbol};

/// Query parameters for the agent discovery oracle.
#[contracttype]
#[derive(Clone, Debug, Eq, PartialEq)]
pub struct DiscoveryQuery {
    /// The specific capability required for matching agents.
    pub required_capability: Symbol,
    /// Maximum acceptable price in stroops (0 = no maximum price restriction).
    pub max_price: i128,
    /// Minimum acceptable reputation score [0, 100].
    pub min_reputation: u32,
    /// Maximum acceptable response time / latency in milliseconds (0 = no maximum latency restriction).
    pub max_latency: u32,
}

/// Individual ranked agent result returned by the discovery oracle.
#[contracttype]
#[derive(Clone, Debug, Eq, PartialEq)]
pub struct DiscoveryResult {
    /// Unique identifier of the matched agent.
    pub agent_id: Symbol,
    /// Composite match score scaled to basis points [0, 10000] (representing 0.00% to 100.00%).
    pub composite_score: u32,
    /// Service price in stroops.
    pub price_stroops: i128,
    /// Reputation score [0, 100].
    pub reputation: u32,
    /// Availability score percentage [0, 100].
    pub availability: u32,
    /// Response time / latency in milliseconds.
    pub response_time: u32,
}

/// Aggregate discovery statistics tracked across all oracle queries.
#[contracttype]
#[derive(Clone, Debug, Eq, PartialEq)]
pub struct DiscoveryStats {
    /// Total count of discovery queries executed.
    pub total_queries: u64,
    /// Total number of agent matches returned across all queries.
    pub total_matches_found: u64,
    /// Number of queries served from in-memory / temporary storage cache.
    pub cache_hits: u64,
}
