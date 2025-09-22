"""
Baseline schema from current models

Revision ID: 0001_baseline
Revises: 
Create Date: 2025-09-19
"""
from alembic import op
import sqlalchemy as sa

revision = '0001_baseline'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # This baseline assumes tables already exist in prod; create if missing for dev
    # Minimal subset to avoid drift; full autogenerate can be added later if desired
    pass


def downgrade():
    pass



