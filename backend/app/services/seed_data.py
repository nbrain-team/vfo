"""
Script to seed Pinecone with mock legal documents for testing.
Run this after setting up Pinecone to populate with sample data.
"""

import logging
from app.services.vector_db import get_vector_db
from app.services.document_processor import get_document_processor
from typing import List, Dict, Any

logger = logging.getLogger(__name__)

# Mock legal documents for testing
MOCK_DOCUMENTS = [
    {
        "file_name": "Smith_Family_Trust_2024.txt",
        "entity_id": "smith_family_trust",
        "document_type": "trust",
        "content": """
        SMITH FAMILY REVOCABLE LIVING TRUST
        
        Dated: March 15, 2024
        
        ARTICLE I - TRUST NAME AND PARTIES
        This trust shall be known as the Smith Family Revocable Living Trust. 
        John Smith and Jane Smith, residents of California, are the Settlors and initial Trustees.
        
        ARTICLE II - TRUST PROPERTY
        The Settlors transfer and deliver to the Trustees all property described in Schedule A attached hereto,
        together with all property that may be added to this trust. The Trustees agree to hold, manage, and 
        distribute the trust property according to the terms set forth in this agreement.
        
        ARTICLE III - REVOCABILITY
        During the lifetime of both Settlors, this trust is wholly revocable and may be amended by the Settlors
        at any time. Upon the death of the first Settlor, the trust becomes irrevocable as to the deceased 
        Settlor's share.
        
        ARTICLE IV - DISTRIBUTIONS DURING SETTLORS' LIFETIME
        During the lifetime of the Settlors, the Trustees shall pay to or apply for the benefit of the Settlors
        all net income and such portions of the principal as the Settlors may request or as the Trustees deem
        necessary for the health, support, and maintenance of the Settlors.
        
        ARTICLE V - SUCCESSOR TRUSTEES
        If John Smith is unable or unwilling to serve as Trustee, Jane Smith shall serve as sole Trustee.
        If both John Smith and Jane Smith are unable or unwilling to serve, Robert Smith shall serve as 
        Successor Trustee. If Robert Smith is unable or unwilling to serve, First National Bank shall serve
        as Successor Trustee.
        
        ARTICLE VI - DISTRIBUTION UPON DEATH
        Upon the death of both Settlors, the Trustee shall distribute the trust estate as follows:
        1. Pay all debts, expenses, and taxes
        2. Distribute personal effects according to written memorandum
        3. Create separate trusts for children under age 25
        4. Distribute remaining assets equally among children who have reached age 25
        
        ARTICLE VII - TRUSTEE POWERS
        The Trustee shall have all powers granted by California law, including but not limited to:
        - Power to invest and reinvest trust assets
        - Power to buy, sell, and manage real property
        - Power to borrow money and encumber trust property
        - Power to employ professionals and pay reasonable compensation
        - Power to make distributions for health, education, maintenance, and support
        """
    },
    {
        "file_name": "John_Smith_Will_2024.txt",
        "entity_id": "john_smith",
        "document_type": "will",
        "content": """
        LAST WILL AND TESTAMENT OF JOHN SMITH
        
        I, John Smith, residing at 123 Main Street, San Francisco, California, being of sound mind and memory,
        do hereby make, publish, and declare this to be my Last Will and Testament, revoking all prior wills
        and codicils.
        
        ARTICLE I - EXECUTOR
        I nominate my spouse, Jane Smith, as Executor of this Will. If Jane Smith is unable or unwilling to
        serve, I nominate my son, Robert Smith, as alternate Executor.
        
        ARTICLE II - PAYMENT OF DEBTS AND EXPENSES
        I direct my Executor to pay all my just debts, funeral expenses, and estate administration expenses
        as soon as practicable after my death.
        
        ARTICLE III - SPECIFIC BEQUESTS
        1. I give my collection of rare books to the San Francisco Public Library
        2. I give my 1967 Mustang to my son, Robert Smith
        3. I give $50,000 to St. Mary's Hospital for cancer research
        4. I give 10% of my estate to the Smith Family Foundation for charitable purposes
        
        ARTICLE IV - RESIDUARY ESTATE
        I give all the rest, residue, and remainder of my estate to my spouse, Jane Smith, if she survives me.
        If Jane Smith does not survive me, I give my residuary estate in equal shares to my children who
        survive me, per stirpes.
        
        ARTICLE V - GUARDIAN
        If my spouse does not survive me, I nominate my brother, Michael Smith, as guardian of any minor children.
        
        ARTICLE VI - TRUST FOR MINOR CHILDREN
        If any beneficiary is under age 25 at the time of distribution, their share shall be held in trust
        until they reach age 25, with distributions for health, education, maintenance, and support at the
        Trustee's discretion.
        
        Signed this 20th day of February, 2024
        """
    },
    {
        "file_name": "Healthcare_POA_John_Smith.txt",
        "entity_id": "john_smith",
        "document_type": "poa",
        "content": """
        DURABLE POWER OF ATTORNEY FOR HEALTHCARE DECISIONS
        
        Principal: John Smith
        Date: January 10, 2024
        
        APPOINTMENT OF AGENT
        I, John Smith, designate and appoint Jane Smith as my agent to make healthcare decisions for me if
        I become unable to make my own healthcare decisions.
        
        ALTERNATE AGENTS
        If Jane Smith is unable or unwilling to serve, I appoint the following alternate agents in order:
        1. Dr. Michael Brown, my primary physician
        2. Robert Smith, my son
        
        AGENT'S AUTHORITY
        My agent is authorized to make all healthcare decisions for me, including:
        - Consent to or refuse any medical treatment
        - Select healthcare providers and facilities
        - Access my medical records
        - Make decisions about life-sustaining treatment
        - Make anatomical gifts
        - Direct disposition of remains
        
        LIFE-SUSTAINING TREATMENT
        If I am in a terminal condition or permanently unconscious, I direct that:
        - Life-sustaining treatment should not be continued artificially
        - Artificial nutrition and hydration may be withheld or withdrawn
        - Comfort care and pain relief should always be provided
        
        MENTAL HEALTH TREATMENT
        My agent may consent to mental health treatment, including admission to a facility for up to 30 days.
        
        HIPAA RELEASE
        I authorize all healthcare providers to release my protected health information to my agent.
        
        This document shall remain in effect until revoked by me in writing.
        """
    },
    {
        "file_name": "Smith_Ventures_LLC_Operating_Agreement.txt",
        "entity_id": "smith_ventures_llc",
        "document_type": "corporate",
        "content": """
        OPERATING AGREEMENT OF SMITH VENTURES LLC
        
        Effective Date: November 5, 2023
        
        ARTICLE I - FORMATION
        Smith Ventures LLC is organized as a California Limited Liability Company under the California
        Revised Uniform Limited Liability Company Act.
        
        ARTICLE II - MEMBERS AND OWNERSHIP
        Initial Members and Percentage Interests:
        - John Smith: 60%
        - Jane Smith: 25%
        - Robert Smith: 15%
        
        ARTICLE III - MANAGEMENT
        The Company shall be member-managed. Decisions require:
        - Routine matters: Simple majority vote
        - Major decisions: 75% supermajority
        - Fundamental changes: Unanimous consent
        
        ARTICLE IV - CAPITAL CONTRIBUTIONS
        Initial Capital Contributions:
        - John Smith: $600,000
        - Jane Smith: $250,000
        - Robert Smith: $150,000
        
        Additional contributions may be made with majority consent.
        
        ARTICLE V - DISTRIBUTIONS
        Distributions shall be made quarterly in proportion to membership interests, provided the Company
        maintains adequate working capital as determined by majority vote.
        
        ARTICLE VI - TRANSFER RESTRICTIONS
        No member may transfer their interest without:
        1. First offering to existing members (right of first refusal)
        2. Obtaining written consent from members holding 75% of interests
        3. New member agreeing to this Operating Agreement
        
        ARTICLE VII - BUY-SELL PROVISIONS
        Upon death, disability, or retirement of a member:
        1. Company has option to purchase interest at fair market value
        2. Valuation by independent appraiser
        3. Payment terms: 20% down, balance over 5 years at prime + 2%
        
        ARTICLE VIII - DISSOLUTION
        The Company shall dissolve upon:
        - Unanimous vote of members
        - Sale of substantially all assets
        - Court order
        - Any event making it unlawful to continue business
        """
    },
    {
        "file_name": "Investment_Policy_Statement_2024.txt",
        "entity_id": "smith_family_office",
        "document_type": "policy",
        "content": """
        SMITH FAMILY OFFICE INVESTMENT POLICY STATEMENT
        
        Effective Date: April 1, 2024
        Status: Under Review
        
        INVESTMENT OBJECTIVES
        Primary Objective: Preserve and grow family wealth across generations
        Secondary Objectives:
        - Generate income for current family needs
        - Maintain purchasing power against inflation
        - Support philanthropic goals
        
        RISK TOLERANCE
        Moderate risk tolerance with focus on capital preservation
        Maximum drawdown tolerance: 15% in any 12-month period
        
        ASSET ALLOCATION TARGETS
        Strategic Asset Allocation:
        - US Equities: 35% (range: 30-40%)
        - International Equities: 20% (range: 15-25%)
        - Fixed Income: 25% (range: 20-30%)
        - Real Estate: 15% (range: 10-20%)
        - Alternative Investments: 5% (range: 0-10%)
        
        REBALANCING POLICY
        - Review quarterly
        - Rebalance when any asset class exceeds range by 5%
        - Consider tax implications in taxable accounts
        
        ESG INVESTMENT CRITERIA
        Environmental, Social, and Governance factors:
        - Exclude tobacco, weapons, and gambling industries
        - Prefer companies with strong ESG ratings
        - Consider impact investing opportunities up to 5% of portfolio
        
        LIQUIDITY REQUIREMENTS
        - Maintain 6 months of expenses in cash/money market
        - Additional 12 months in liquid investments
        - Illiquid investments limited to 20% of total portfolio
        
        PERFORMANCE BENCHMARKS
        - Total Portfolio: 60% MSCI ACWI / 40% Bloomberg Aggregate
        - Review performance quarterly against benchmarks
        - Evaluate managers annually
        
        REVIEW AND AMENDMENTS
        This IPS shall be reviewed annually and amended as needed to reflect changes in:
        - Family circumstances
        - Market conditions
        - Regulatory environment
        """
    }
]

def seed_mock_documents():
    """
    Seed Pinecone with mock legal documents.
    """
    try:
        vector_db = get_vector_db()
        processor = get_document_processor()
        
        logger.info("Starting to seed mock documents...")
        
        for doc_data in MOCK_DOCUMENTS:
            logger.info(f"Processing {doc_data['file_name']}...")
            
            # Process document
            processed = processor.process_document(
                file_content=doc_data['content'].encode('utf-8'),
                file_name=doc_data['file_name'],
                file_type='txt',
                metadata={
                    'entity_id': doc_data['entity_id'],
                    'document_type': doc_data['document_type'],
                    'user_id': 'demo_user'  # Demo user for testing
                }
            )
            
            # Index in vector database
            success = vector_db.upsert_document_chunks(
                chunks=processed['chunks'],
                metadata={
                    'document_id': f"{doc_data['entity_id']}_{doc_data['file_name']}",
                    'entity_id': doc_data['entity_id'],
                    'document_type': doc_data['document_type'],
                    'user_id': 'demo_user',
                    'file_name': doc_data['file_name']
                }
            )
            
            if success:
                logger.info(f"Successfully indexed {doc_data['file_name']} with {processed['num_chunks']} chunks")
            else:
                logger.error(f"Failed to index {doc_data['file_name']}")
        
        # Get index stats
        stats = vector_db.get_index_stats()
        logger.info(f"Seeding complete. Index stats: {stats}")
        
        return True
        
    except Exception as e:
        logger.error(f"Error seeding documents: {str(e)}")
        return False

if __name__ == "__main__":
    # Set up logging
    logging.basicConfig(level=logging.INFO)
    
    # Run seeding
    success = seed_mock_documents()
    
    if success:
        print("✅ Successfully seeded mock documents to Pinecone!")
    else:
        print("❌ Failed to seed documents. Check logs for details.") 